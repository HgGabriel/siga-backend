/**
 * Authentication configuration module.
 *
 * Loads environment variables and exports JWT settings.
 *
 * @module config/auth
 * @requires dotenv
 * @property {string} jwtSecret - Secret key for signing JWT tokens. Loaded from environment variable JWT_SECRET or defaults to 'seuSegredoSuperSecreto'.
 * @property {string} jwtExpiration - Expiration time for JWT tokens (e.g., '24h').
 */
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET, // Fallback para um segredo padrão, mas idealmente sempre virá do .env
  jwtExpiration: '24h' // Token expira em 24 horas
}; 