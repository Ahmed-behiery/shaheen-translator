const Joi = require("joi");

module.exports.createAdminSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
