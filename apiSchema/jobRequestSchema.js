const Joi = require("joi");

module.exports.createJobRequestSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  job: Joi.string().required(),
});
module.exports.getAllJobRequestsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});
module.exports.updateJobRequest = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  job: Joi.string().required(),
});
