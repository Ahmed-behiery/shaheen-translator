const Joi = require("joi");

module.exports.createJobSchema = Joi.object({
  name_en: Joi.string().required(),
  description_en: Joi.string().required(),
  name_ar: Joi.string().required(),
  description_ar: Joi.string().required(),
  salary: Joi.string(),
  location: Joi.string(),
  show: Joi.boolean().default(false),
});

module.exports.getAllJobsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateJob = Joi.object({
  name_en: Joi.string(),
  description_en: Joi.string(),
  name_ar: Joi.string(),
  description_ar: Joi.string(),
  salary: Joi.string(),
  location: Joi.string(),
  show: Joi.boolean().default(false),
});
