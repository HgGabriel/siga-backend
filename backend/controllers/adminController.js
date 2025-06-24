/**
 * Cria um novo administrador.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de requisição do Express contendo os campos nome, cpf, senha e email no corpo.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON indicando sucesso ou erro.
 */

/**
 * Exclui um administrador existente.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de requisição do Express contendo o campo cpf no corpo.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON indicando sucesso ou erro.
 */

const User = require("../models/User");
const bcrypt = require('bcryptjs');

exports.createAdmin = async (req, res) => {
  const { nome, cpf, senha, email } = req.body;

  if (!nome || !cpf || !senha) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }
  try {
    let admin = await User.findOne({ cpf });
    if (admin) {
      return res.status(400).json({ message: "Administrador já existe." });
    }
    admin = new User({
      nome,
      email,
      cpf,
      senha,
      role: "admin",
    });

    await admin.save();
    res.status(201).json({ message: "Administrador criado com sucesso." });
  } catch (err) {
    console.error("Erro ao criar administrador:", err.message);
    res.status(500).send("Erro no servidor");
  }
};

exports.deleteAdmin = async (req, res) => {
  const { cpf } = req.body;

  try {
    const admin = await User.findOne({ cpf });
    console.log(admin);
    if (!admin) {
      console.log(cpf);
      return res.status(404).json({ message: "Administrador não encontrado." });
    }
    
    await User.findByIdAndDelete(admin._id);
    res.status(200).json({ message: "Administrador excluído com sucesso." });
  }
  catch (err) {
    console.error("Erro ao excluir administrador:", err.message);
    res.status(500).send("Erro no servidor");
  }
}