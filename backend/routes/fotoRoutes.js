/**
 * Rotas para upload, exibição e remoção de fotos de perfil dos usuários.
 * 
 * @module routes/fotoRoutes
 * 
 * Endpoints:
 *  - POST /fotos/upload/:id       → Envia e salva uma foto no MongoDB
 *  - GET /fotos/:id               → Retorna a foto do usuário
 *  - DELETE /fotos/:id            → Remove a foto do usuário
 */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require('../middlewares/uploadMiddleware');
const multer = require("multer");

// Configuração do Multer para armazenar em memória (Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route POST /fotos/upload/:id
 * @desc Faz upload de uma foto e salva diretamente no banco
 * @access Público (adicione middleware de auth se necessário)
 */
router.post("/upload/:id", upload.single("foto"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }

    user.fotoPerfil = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await user.save();

    res.status(200).json({ message: "Foto enviada e salva com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao salvar a foto" });
  }
});

/**
 * @route GET /fotos/:id
 * @desc Retorna a foto de perfil do usuário
 * @access Público
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.fotoPerfil || !user.fotoPerfil.data) {
      return res.status(404).json({ message: "Foto não encontrada" });
    }

    res.set("Content-Type", user.fotoPerfil.contentType);
    res.send(user.fotoPerfil.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao carregar a foto" });
  }
});

/**
 * @route DELETE /fotos/:id
 * @desc Remove a foto de perfil do usuário
 * @access Público
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!user.fotoPerfil || !user.fotoPerfil.data) {
      return res.status(400).json({ message: "O usuário não possui foto" });
    }

    user.fotoPerfil = undefined;
    await user.save();

    res.status(200).json({ message: "Foto removida com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover a foto" });
  }
});

module.exports = router;
