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
    type: String,
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
