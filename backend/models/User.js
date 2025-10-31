/**
 * User model schema definition for MongoDB using Mongoose.
 * 
 * Includes:
 * - Role-based access (aluno, professor, admin)
 * - CPF validation and formatting
 * - Password hashing with bcrypt
 * - Unique fields: cpf, ra, email
 * - Embedded schemas for enrolled subjects and grades
 * - Automatic timestamps for creation and updates
 * - Password comparison method
 * 
 * @module models/User
 * 
 * @typedef {Object} Notas
 * @property {number} [P1] - Nota da primeira prova (0-10)
 * @property {number} [P2] - Nota da segunda prova (0-10)
 * @property {number} [T] - Nota do trabalho (0-10)
 * @property {number} [P3] - Nota da terceira prova (0-10)
 * 
 * @typedef {Object} Presenca
 * @property {number} aulasTotais - Total de aulas da matéria
 * @property {number} [faltas] - Quantidade de faltas (default: 0)
 * 
 * @typedef {Object} MateriaMatriculada
 * @property {mongoose.Types.ObjectId} materia - Referência à matéria (Subject)
 * @property {Notas} [notas] - Notas do aluno na matéria
 * @property {number} [faltas] - Faltas na matéria (default: 0)
 * @property {Presenca} presenca - Informações de presença
 * 
 * @typedef {Object} User
 * @property {"aluno"|"professor"|"admin"} role - Papel do usuário
 * @property {string} cpf - CPF do usuário (único, validado)
 * @property {string} senha - Senha do usuário (hash, não retornada por padrão)
 * @property {string} [ra] - Registro acadêmico (único)
 * @property {string} nome - Nome completo do usuário
 * @property {string} email - Email do usuário (único, minúsculo, trim)
 * @property {mongoose.Types.ObjectId} [curso] - Referência ao curso (Course)
 * @property {MateriaMatriculada[]} [materias] - Matérias matriculadas
 * @property {string} [fotoPerfil] - URL da foto de perfil
 * @property {Date} [createdAt] - Data de criação
 * @property {Date} [updatedAt] - Data de atualização
 * 
 * @function comparePassword
 * @description Compara uma senha fornecida com o hash armazenado.
 * @param {string} candidatePassword - Senha a ser comparada
 * @returns {Promise<boolean>} true se as senhas coincidirem, false caso contrário
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isValidCpf, format } = require("../utils/cpfValidator");

// Schema para notas de uma matéria
const notasSchema = new mongoose.Schema({
  P1: { type: Number, min: 0, max: 10 },
  P2: { type: Number, min: 0, max: 10 },
  T: { type: Number, min: 0, max: 10 },
  P3: { type: Number, min: 0, max: 10 },
});

// Schema para matérias matriculadas
const materiaMatriculadaSchema = new mongoose.Schema({
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  notas: notasSchema,
  faltas: {
    type: Number,
    min: 0,
    default: 0,
  },
  presenca: {
    aulasTotais: { type: Number, required: true },
    faltas: { type: Number, default: 0, required: true },
  },
});

// Schema principal do usuário (aluno)
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["aluno", "professor", "admin"],
    required: true,
  },
  cpf: {
    type: String,
    required: [true, "CPF é obrigatório"],
    unique: true,
    validate: {
      validator: function (cpf) {
        const formattedCpf = format(cpf);
        return isValidCpf(formattedCpf);
      },
      message: (props) => `${props.value} não é um CPF válido`,
    },
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatória"],
    select: false, // Não retorna a senha nas consultas por padrão
  },
  ra: {
    type: String,
    unique: true,
  },
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  materias: [materiaMatriculadaSchema],
  fotoPerfil: {  
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para hash da senha antes de salvar
userSchema.pre("save", async function (next) {
  // Só faz hash da senha se ela foi modificada ou é nova
  if (!this.isModified("senha")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Atualiza o updatedAt antes de salvar
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.senha);
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);
