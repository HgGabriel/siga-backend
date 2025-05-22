const mongoose = require('mongoose');

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