/**
 * Multer configuration module for handling image uploads.
 * 
 * - Stores uploaded images in the 'uploads/' directory.
 * - Filenames are generated using the authenticated user's ID, a unique suffix, and the original file extension.
 * - Only image files are accepted (based on MIME type).
 * - Maximum file size allowed is 5MB.
 * 
 * @module config/multer
 * @requires multer
 * @requires path
 * 
 * @typedef {import('multer').StorageEngine} StorageEngine
 * @typedef {import('multer').FileFilterCallback} FileFilterCallback
 * 
 * @constant
 * @type {import('multer').Multer}
 * @description Configured Multer instance for handling image uploads.
 * 
 * @example
 * const upload = require('./config/multer');
 * app.post('/upload', upload.single('image'), (req, res) => {
 *   res.send('File uploaded successfully!');
 * });
 */

const multer = require('multer');
const path = require('path');

// Define o local de armazenamento das imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Salva os arquivos na pasta 'uploads'
  },
  filename: (req, file, cb) => {
    // Garante que req.user exista e tenha a propriedade id (será populado pelo middleware de autenticação)
    const userId = req.user ? req.user.id : 'unknown_user';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `${userId}-${uniqueSuffix}${extension}`);
  }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado. Apenas imagens são permitidas.'), false);
  }
};

// Configuração do Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB para o tamanho do arquivo
  },
  fileFilter: fileFilter
});

module.exports = upload; 