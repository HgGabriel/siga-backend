const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiration } = require('../config/auth');
const cpfValidator = require('../utils/cpfValidator');

// Login
exports.login = async (req, res) => {
  const { cpf, senha } = req.body;

  // TODO: Adicionar validação de entrada (ex: Joi ou express-validator)
  if (!cpf || !senha) {
    return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
  }

  // Valida o formato do CPF
  if (!cpfValidator.isValidCpf(cpf)) {
    return res.status(400).json({ message: 'Formato de CPF inválido.' });
  }

  try {
    // Procura o usuário pelo CPF
    const user = await User.findOne({ cpf }).select("+senha"); // Inclui a senha para comparação
    console.log("user:" + user);
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ message: 'CPF ou senha inválidos.' });
    }

    // Compara a senha fornecida com a senha armazenada (hash)
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      console.log('Senha inválida');
      return res.status(401).json({ message: 'CPF ou senha inválidos.' });
    }

    // Cria o payload do token JWT
    const payload = {
      user: {
        id: user.id,
        // Outras informações do usuário que você queira incluir no token (ex: role)
      }
    };

    // Gera o token JWT
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtExpiration },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.log("senha:" + senha);
    console.log("cpf:" + cpf);
    console.error('Erro no login:', err.message);
    res.status(500).send('Erro no servidor');
  }
}; 