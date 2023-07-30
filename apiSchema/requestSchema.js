const Joi = require("joi");

module.exports.createRequestSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  //   comment: Joi.string().required(),
});
module.exports.getAllRequestsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});
module.exports.updateRequest = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  //   comment: Joi.string().required(),
});
