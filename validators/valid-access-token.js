const { body } = require('express-validator');

// -----------------------------------------

const validAccessToken = [
  body('accessToken').exists(),
  body('accessToken').isString(),
  body('accessToken').notEmpty()
];

module.exports = validAccessToken;