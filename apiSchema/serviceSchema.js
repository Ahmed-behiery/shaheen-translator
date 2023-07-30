const Joi = require("joi");

module.exports.createServiceSchema = Joi.object({
  title_en: Joi.string().required(),
  title_ar: Joi.string().required(),
  description_en: Joi.string().required(),
  description_ar: Joi.string().required(),
  descriptionInDetails_en: Joi.string().required(),
  descriptionInDetails_ar: Joi.string().required(),
});

module.exports.getAllServicesSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateService = Joi.object({
  title_en: Joi.string().required(),
  title_ar: Joi.string().required(),
  description_en: Joi.string().required(),
  description_ar: Joi.string().required(),
  descriptionInDetails_en: Joi.string().required(),
  descriptionInDetails_ar: Joi.string().required(),
});
