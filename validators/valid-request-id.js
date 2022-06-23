const { body } = require('express-validator');

// -----------------------------------------

const validRequestId = [
  body('requestId').exists(),
  body('requestId').isString(),
  body('requestId').notEmpty()
];

module.exports = validRequestId;