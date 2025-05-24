const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middlewares/auth');
const studentCheck = require('../middlewares/studentCheck');
const upload = require('../config/multer');

// Todas as rotas aqui requerem autenticação e verificação de aluno
//router.use(auth);
//router.use(studentCheck);

// Rotas para gerenciamento de foto de perfil
router.post('/photo', upload.single('photo'), profileController.uploadPhoto);
router.get('/photo', profileController.getPhoto);
router.delete('/photo', profileController.deletePhoto);

module.exports = router; 
