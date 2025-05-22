// Middleware de tratamento de erros centralizado
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Erros de validação do Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: Object.values(err.errors).map(error => ({
        field: error.path,
        message: error.message
      }))
    });
  }

  // Erros de ID inválido do Mongoose
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      message: 'ID inválido'
    });
  }

  // Erros de arquivo (upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      message: 'Arquivo muito grande. Tamanho máximo permitido: 5MB'
    });
  }

  // Erros de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expirado'
    });
  }

  // Erro padrão para outros casos
  res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}; 