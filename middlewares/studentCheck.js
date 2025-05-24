/**
 * Middleware para verificar se o usuário autenticado pode acessar ou modificar dados de um aluno.
 *
 * - Garante que o usuário só possa acessar seus próprios dados.
 * - Verifica se o usuário existe no banco de dados.
 * - (Opcional) Permite adicionar verificações adicionais, como checar se o usuário tem o papel de aluno.
 *
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express para passar ao próximo middleware.
 * @returns {Promise<void>}
 */

const User = require('../models/User');

module.exports = async (req, res, next) => {

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (user.role === 'admin') {
    return next(); // Admin pode acessar todos os dados
  }

  

  try {
    // Verifica se o ID do usuário na requisição corresponde ao ID do token
    const requestedUserId = req.params.userId || req.body.userId;
    
    if (requestedUserId && requestedUserId !== req.user.id) {
      return res.status(403).json({ 
        message: 'Acesso negado. Você só pode acessar seus próprios dados.' 
      });
    }

    // Verifica se o usuário existe e é um aluno
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // TODO: verificar se o usuário tem role de aluno
    // if (user.role !== 'student') {
    //   return res.status(403).json({ message: 'Acesso permitido apenas para alunos.' });
    // }

    next();
  } catch (err) {
    console.error('Erro no middleware studentCheck:', err.message);
    res.status(500).send('Erro no servidor');
  }
}; 