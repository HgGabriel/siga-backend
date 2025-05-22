const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

module.exports = (req, res, next) => {
  // Obtém o token do header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso negado.' });
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Adiciona o usuário ao objeto da requisição
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
  }
}; 