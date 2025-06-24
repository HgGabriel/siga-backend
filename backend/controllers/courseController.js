/**
 * Cria um novo curso.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de requisição do Express contendo os dados do curso no corpo da requisição.
 * @param {import('express').Response} res - Objeto de resposta do Express usado para enviar a resposta ao cliente.
 * @returns {Promise<void>}
 *
 * @throws {400} Se algum campo obrigatório estiver faltando ou se o curso já existir.
 * @throws {500} Se ocorrer um erro interno no servidor.
 */

const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const { nome, codigo, duracao, descricao, materias } = req.body;

  if (!nome || !codigo || !descricao || !duracao || !materias) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    let course = await Course.findOne({ codigo });
    if (course) {
      return res.status(400).json({ message: 'Curso já existe.' });
    }

    course = new Course({
      nome,
      codigo,
      duracao,
      descricao,
      materias,
    });

    await course.save();
    res.status(201).json({ message: 'Curso criado com sucesso.' });
  } catch (err) {
    console.error('Erro ao criar curso:', err.message);
    res.status(500).send('Erro no servidor');
  }
}