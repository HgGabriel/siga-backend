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

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/courses', courseRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'API do Sistema Acadêmico' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 