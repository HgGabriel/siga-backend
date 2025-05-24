/**
 * Conecta ao banco de dados MongoDB usando Mongoose.
 * 
 * Lê a URI do MongoDB a partir da variável de ambiente `MONGODB_URI`.
 * Em caso de falha na conexão, exibe o erro no console e encerra o processo.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Uma Promise que resolve quando a conexão é bem-sucedida.
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Removido pois não é mais suportado no Mongoose 6+
      // useFindAndModify: false, // Removido pois não é mais suportado no Mongoose 6+
    });
    console.log('MongoDB conectado com sucesso.');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    // Encerra o processo com falha
    process.exit(1);
  }
};

module.exports = connectDB; 