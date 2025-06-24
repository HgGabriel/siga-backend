const mongoose = require('mongoose');

/**
 * Mongoose schema for the Subject model.
 *
 * Represents a school subject with its details, including name, code, description,
 * workload, assigned professor, semester, prerequisites, and timestamps.
 *
 * Fields:
 * @typedef {Object} Subject
 * @property {string} nome - Nome da matéria (unique, required).
 * @property {string} codigo - Código da matéria (unique, required).
 * @property {string} descricao - Descrição da matéria (required).
 * @property {number} cargaHoraria - Carga horária da matéria (required, min: 1).
 * @property {Object} professor - Dados do professor responsável.
 * @property {string} professor.nome - Nome do professor (required).
 * @property {string} professor.email - Email do professor (required, lowercase, trimmed).
 * @property {number} semestre - Semestre da matéria (required, min: 1).
 * @property {Array<ObjectId>} preRequisitos - Lista de pré-requisitos (referências para outras matérias).
 * @property {Date} createdAt - Data de criação do registro.
 * @property {Date} updatedAt - Data da última atualização do registro.
 */

const subjectSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome da matéria é obrigatório'],
    unique: true
  },
  codigo: {
    type: String,
    required: [true, 'Código da matéria é obrigatório'],
    unique: true
  },
  descricao: {
    type: String,
    required: [true, 'Descrição da matéria é obrigatória']
  },
  cargaHoraria: {
    type: Number,
    required: [true, 'Carga horária é obrigatória'],
    min: 1
  },
  professor: {
    nome: {
      type: String,
      required: [true, 'Nome do professor é obrigatório']
    },
    email: {
      type: String,
      required: [true, 'Email do professor é obrigatório'],
      lowercase: true,
      trim: true
    }
  },
  semestre: {
    type: Number,
    required: [true, 'Semestre é obrigatório'],
    min: 1
  },
  preRequisitos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Atualiza o updatedAt antes de salvar
subjectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Subject', subjectSchema); 