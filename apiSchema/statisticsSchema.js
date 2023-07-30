const Joi = require("joi");

module.exports.createStatisticsSchema = Joi.object({
  text_en: Joi.string().required(),
  title_en: Joi.string().required(),
  text_ar: Joi.string().required(),
  title_ar: Joi.string().required(),
  count: Joi.required(),
});

module.exports.getAllStatisticsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateStatistics = Joi.object({
  text_en: Joi.string().required(),
  title_en: Joi.string().required(),
  text_ar: Joi.string().required(),
  title_ar: Joi.string().required(),
  count: Joi.required(),
});
