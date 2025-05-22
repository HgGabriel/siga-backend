const mongoose = require('mongoose');

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
      required: [true, 'Nome do coordenador é obrigatório']
    },
    email: {
      type: String,
      required: [true, 'Email do coordenador é obrigatório'],
      lowercase: true,
      trim: true
    }
  },
  materias: [{
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
courseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Course', courseSchema); 