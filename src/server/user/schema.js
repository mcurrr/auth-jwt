const Joi = require('joi');

const schema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(24)
    .alphanum()
    .required(),

  password: Joi.string()
    .min(7)
    .max(64)
    .required(),
})

module.exports = schema;
