/**
 * Middleware para autenticação JWT.
 * 
 * Verifica se o token JWT está presente no header Authorization da requisição,
 * valida o token e adiciona o usuário decodificado ao objeto da requisição.
 * 
 * @module middlewares/auth
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express para passar o controle ao próximo middleware.
 * @returns {void}
 * 
 * @throws {401} Se o token não for fornecido ou for inválido.
 */

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