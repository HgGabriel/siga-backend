const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  const { nome, codigo, descricao, cargaHoraria, professor, semestre } = req.body;

  // Validação básica
  if (
    !nome ||
    !codigo ||
    !descricao ||
    !cargaHoraria ||
    !professor ||
    !semestre
    
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }
  try {
    // Verifica se a matéria já existe
    let subject = await Subject.findOne({ codigo });
    if (subject) {
      return res.status(400).json({ message: "Matéria já existe." });
    }

    // Cria uma nova matéria
    subject = new Subject({
      nome,
      codigo,
      descricao,
      cargaHoraria,
      professor,
      semestre,
    });
    await subject.save();
    res.status(201).json({ message: "Matéria criada com sucesso." });
  } catch (err) {
    console.error("Erro ao criar matéria:", err.message);
    res.status(500).send("Erro no servidor");
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    console.error("Erro ao buscar matérias:", err.message);
    res.status(500).send("Erro no servidor");
  }
};
