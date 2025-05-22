require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'seuSegredoSuperSecreto', // Fallback para um segredo padrão, mas idealmente sempre virá do .env
  jwtExpiration: '24h' // Token expira em 24 horas
}; 