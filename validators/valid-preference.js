const { body } = require('express-validator');

// -----------------------------------------

const validPreference = [
  body('preference').exists(),
  body('preference').isObject(),
  body('preference').notEmpty(),
  body('preference.items').exists(),
  body('preference.items').isArray(),
  body('preference.items').notEmpty()
];

module.exports = validPreference;