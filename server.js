/**
 * @file server.js
 * @description Entry point for the Academic System API server. Sets up Express app, connects to MongoDB,
 * configures middlewares, serves static files, registers API routes, handles errors, and starts the server.
 * 
 * @requires express
 * @requires cors
 * @requires path
 * @requires dotenv/config
 * @requires ./config/database
 * @requires ./middlewares/errorHandler
 * @requires ./routes/authRoutes
 * @requires ./routes/studentRoutes
 * @requires ./routes/profileRoutes
 * @requires ./routes/adminRoutes
 * @requires ./routes/subjectRoutes
 * @requires ./routes/courseRoutes
 * 
 * @module server
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Inicializa o app Express
const app = express();

// Conecta ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/courses', courseRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API do Sistema Acadêmico' });
});

// Rota para tratar 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 