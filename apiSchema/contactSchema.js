const Joi = require("joi");

module.exports.createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  fullname: Joi.string(),
});

module.exports.getAllContactsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  fullname: Joi.string(),
  subject: Joi.string(),
  message: Joi.string(),
});
