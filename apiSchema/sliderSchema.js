const Joi = require("joi");

module.exports.createSliderSchema = Joi.object({
  title_en: Joi.string().required(),
  description_en: Joi.string().required(),
  title_ar: Joi.string().required(),
  description_ar: Joi.string().required(),
});

module.exports.getAllSlidersSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateSlider = Joi.object({
  title_en: Joi.string().required(),
  description_en: Joi.string().required(),
  title_ar: Joi.string().required(),
  description_ar: Joi.string().required(),
});
