const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middlewares/auth');
const studentCheck = require('../middlewares/studentCheck');

// Todas as rotas aqui requerem autenticação e verificação de aluno
router.use(auth);
router.use(studentCheck);

// Rota para obter dados do aluno
router.get('/', studentController.getStudentData);

module.exports = router; 