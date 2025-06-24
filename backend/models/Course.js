const mongoose = require('mongoose');

/**
 * Mongoose schema for the Course model.
 *
 * @typedef {Object} Course
 * @property {string} nome - Nome do curso (obrigatório, único).
 * @property {string} codigo - Código do curso (obrigatório, único).
 * @property {string} descricao - Descrição do curso (obrigatória).
 * @property {number} duracao - Duração do curso em semestres (obrigatória, mínimo 1).
 * @property {Object} coordenador - Informações do coordenador do curso.
 * @property {string} [coordenador.nome] - Nome do coordenador.
 * @property {string} [coordenador.email] - Email do coordenador (minúsculo, sem espaços).
 * @property {Array.<mongoose.Types.ObjectId>} materias - Lista de IDs das matérias associadas (obrigatório).
 * @property {Date} createdAt - Data de criação do curso (padrão: data atual).
 * @property {Date} updatedAt - Data da última atualização do curso (padrão: data atual).
 */

const courseSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do curso é obrigatório'],
    unique: true
  },
  codigo: {
    type: String,
    required: [true, 'Código do curso é obrigatório'],
    unique: true
  },
  descricao: {
    type: String,
    required: [true, 'Descrição do curso é obrigatória']
  },
  duracao: {
    type: Number, // Em semestres
    required: [true, 'Duração do curso é obrigatória'],
    min: 1
  },
  coordenador: {
    nome: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    }
  },
  materias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
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
courseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Course', courseSchema); 