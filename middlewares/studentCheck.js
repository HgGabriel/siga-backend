const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Verifica se o ID do usuário na requisição corresponde ao ID do token
    const requestedUserId = req.params.userId || req.body.userId;
    
    if (requestedUserId && requestedUserId !== req.user.id) {
      return res.status(403).json({ 
        message: 'Acesso negado. Você só pode acessar seus próprios dados.' 
      });
    }

    // Verifica se o usuário existe e é um aluno
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Você pode adicionar verificações adicionais aqui
    // Por exemplo, verificar se o usuário tem role de aluno
    // if (user.role !== 'student') {
    //   return res.status(403).json({ message: 'Acesso permitido apenas para alunos.' });
    // }

    next();
  } catch (err) {
    console.error('Erro no middleware studentCheck:', err.message);
    res.status(500).send('Erro no servidor');
  }
}; 