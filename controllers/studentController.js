const User = require('../models/User');

// Recupera os dados do aluno autenticado
exports.getStudentData = async (req, res) => {
  try {
    // O ID do usuário é extraído do token JWT pelo middleware de autenticação
    // e está disponível em req.user.id
    // O middleware studentCheck garante que o usuário só pode acessar seus próprios dados.
    const student = await User.findById(req.user.id)
      .select('-senha -cpf') // Exclui campos sensíveis
      .populate('curso') // Popula o campo curso (referência)
      .populate('materias.materia'); // Popula as matérias matriculadas (referência dentro de um array)

    if (!student) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    res.json(student);
  } catch (err) {
    console.error('Erro ao buscar dados do aluno:', err.message);
    res.status(500).send('Erro no servidor');
  }
}; 

exports.createStudent = async (req, res) => {
  const { nome, email, cpf, senha, ra } = req.body;

  // Validação básica
  if (!nome || !email || !cpf || !senha || !ra) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o aluno já existe
    let student = await User.findOne({ cpf });
    if (student) {
      return res.status(400).json({ message: 'Aluno já existe.' });
    }

    // Cria um novo aluno
    student = new User({
      nome,
      email,
      cpf,
      senha,
      ra,
      role: 'aluno'
    });

    await student.save();

    res.status(201).json({ message: 'Aluno criado com sucesso.' });
  } catch (err) {
    console.error('Erro ao criar aluno:', err.message);
    res.status(500).send('Erro no servidor');
  }
}

