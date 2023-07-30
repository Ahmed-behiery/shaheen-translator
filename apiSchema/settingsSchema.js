const Joi = require("joi");

const URL_PATTERN =
  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

module.exports.createSettingsSchema = Joi.object({
  address_ar: Joi.string(),
  address_en: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  phone2: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  facebook: Joi.string()
    .pattern(URL_PATTERN)
    .message("Facebook Must be a valid URL"),
  twitter: Joi.string()
    .pattern(URL_PATTERN)
    .message("Twitter Must be a valid URL"),
  instagram: Joi.string()
    .pattern(URL_PATTERN)
    .message("Instagram Must be a valid URL"),
  youtube: Joi.string()
    .pattern(URL_PATTERN)
    .message("Youtube Must be a valid URL"),
  google: Joi.string()
    .pattern(URL_PATTERN)
    .message("Google Must be a valid URL"),
});

module.exports.getAllSettingsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateSettings = Joi.object({
  address_ar: Joi.string(),
  address_en: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  phone2: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  facebook: Joi.string()
    .pattern(URL_PATTERN)
    .message("Facebook Must be a valid URL"),
  twitter: Joi.string()
    .pattern(URL_PATTERN)
    .message("Twitter Must be a valid URL"),
  instagram: Joi.string()
    .pattern(URL_PATTERN)
    .message("Instagram Must be a valid URL"),
  youtube: Joi.string()
    .pattern(URL_PATTERN)
    .message("Youtube Must be a valid URL"),
  google: Joi.string()
    .pattern(URL_PATTERN)
    .message("Google Must be a valid URL"),
});
