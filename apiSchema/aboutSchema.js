const Joi = require("joi");

module.exports.createAboutSchema = Joi.object({
  description_en: Joi.string().required(),
  description_ar: Joi.string().required(),
});

module.exports.getAllAboutsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateAbout = Joi.object({
  description_en: Joi.string().required(),
  description_ar: Joi.string().required(),
});
