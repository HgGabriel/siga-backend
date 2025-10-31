/**
 * Middleware de upload de arquivos (fotos de perfil) usando Multer.
 *
 * Configura o armazenamento em memória para permitir o salvamento
 * direto no banco de dados (MongoDB) como Buffer, sem criar arquivos locais.
 *
 * Inclui:
 * - Limite de tamanho (5MB)
 * - Filtro de tipo MIME (apenas imagens)
 * - Mensagens de erro consistentes
 *
 * @module middlewares/uploadMiddleware
 *
 * @requires multer
 * @requires path
 *
 * @constant {import('multer').Multer} upload
 * @example
 * const upload = require('../middlewares/uploadMiddleware');
 * router.post('/upload/:id', upload.single('foto'), controllerFunction);
 */

const multer = require('multer');
const path = require('path');

// Configuração de armazenamento em memória
const storage = multer.memoryStorage();

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo inválido. Envie uma imagem (JPEG, PNG, WEBP).'), false);
  }
};

// Configuração final do upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;
