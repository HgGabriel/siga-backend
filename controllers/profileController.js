const fs = require('fs').promises;
const path = require('path');
const User = require('../models/User');

// Upload/Atualização de foto de perfil
exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      // Se o usuário não existe, remove o arquivo que foi feito upload
      await fs.unlink(req.file.path);
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Se já existe uma foto anterior, exclui
    if (user.fotoPerfil) {
      const oldPhotoPath = path.join(__dirname, '..', 'uploads', user.fotoPerfil);
      try {
        await fs.unlink(oldPhotoPath);
      } catch (err) {
        console.warn('Aviso: Foto antiga não encontrada para exclusão');
      }
    }

    // Atualiza o caminho da foto no banco de dados
    user.fotoPerfil = req.file.filename;
    await user.save();

    res.json({
      message: 'Foto de perfil atualizada com sucesso',
      photoUrl: `/uploads/${req.file.filename}`
    });
  } catch (err) {
    console.error('Erro ao fazer upload da foto:', err.message);
    // Em caso de erro, tenta remover o arquivo que foi feito upload
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkErr) {
        console.error('Erro ao remover arquivo após falha:', unlinkErr);
      }
    }
    res.status(500).send('Erro no servidor');
  }
};

// Exclusão de foto de perfil
exports.deletePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (!user.fotoPerfil) {
      return res.status(404).json({ message: 'Usuário não possui foto de perfil.' });
    }

    // Remove o arquivo físico
    const photoPath = path.join(__dirname, '..', 'uploads', user.fotoPerfil);
    try {
      await fs.unlink(photoPath);
    } catch (err) {
      console.warn('Aviso: Arquivo físico da foto não encontrado');
    }

    // Remove a referência no banco de dados
    user.fotoPerfil = undefined;
    await user.save();

    res.json({ message: 'Foto de perfil removida com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir foto:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Recuperar foto de perfil
exports.getPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.fotoPerfil) {
      return res.status(404).json({ message: 'Foto de perfil não encontrada.' });
    }

    res.json({ photoUrl: `/uploads/${user.fotoPerfil}` });
  } catch (err) {
    console.error('Erro ao recuperar foto:', err.message);
    res.status(500).send('Erro no servidor');
  }
}; 