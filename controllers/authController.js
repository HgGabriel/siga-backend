/**
 * Handles user login.
 * 
 * @async
 * @function
 * @param {import('express').Request} req - Express request object containing CPF and senha in the body.
 * @param {import('express').Response} res - Express response object used to send the response.
 * @returns {Promise<void>} Returns a JWT token if authentication is successful, otherwise returns an error message.
 * 
 * @throws {500} If there is a server error during the login process.
 * 
 * @example
 * // Request body:
 * // {
 * //   "cpf": "12345678909",
 * //   "senha": "userpassword"
 * // }
 * 
 * // Successful response:
 * // {
 * //   "token": "jwt_token_here"
 * // }
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiration } = require('../config/auth');
const cpfValidator = require('../utils/cpfValidator');

// Login
exports.login = async (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
  }

  if (!cpfValidator.isValidCpf(cpf)) {
    return res.status(400).json({ message: 'Formato de CPF inválido.' });
  }

  try {
    const user = await User.findOne({ cpf }).select("+senha"); 
    console.log("user:" + user);
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ message: 'CPF ou senha inválidos.' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      console.log('Senha inválida');
      return res.status(401).json({ message: 'CPF ou senha inválidos.' });
    }

    const payload = {
      user: {
        id: user.id,
      }
    };

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