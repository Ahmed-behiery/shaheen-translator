const Joi = require("joi");

module.exports.createCommentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  text: Joi.string().required(),
  show: Joi.boolean().default(false),
});

module.exports.getAllCommentsSchema = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateComment = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
  text: Joi.string(),
  show: Joi.boolean().default(false),
});
