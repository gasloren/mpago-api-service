const { header } = require('express-validator');

const authApiKeyToken = process.env.AUTH_API_KEY_TOKEN;

// -----------------------------------------

const validAuthApiKeyToken = [
  header('auth-api-key-token').exists(),
  header('auth-api-key-token').isString(),
  header('auth-api-key-token').notEmpty(),
  header('auth-api-key-token').equals(authApiKeyToken)
];

module.exports = validAuthApiKeyToken;