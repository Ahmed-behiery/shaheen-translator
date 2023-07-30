const Joi = require("joi");

module.exports.createCustomerSchema = Joi.object({
  link: Joi.string().required(),
});

module.exports.getAllCustomersSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateCustomer = Joi.object({
  link: Joi.string().required(),
});
