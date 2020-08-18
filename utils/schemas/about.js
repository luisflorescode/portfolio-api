const joi = require('@hapi/joi');

const aboutIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const aboutPhotoSchema = joi.string().uri();
const aboutDescriptionSchema = joi.string().max(420);

const createAboutSchema = {
  photo: aboutPhotoSchema.required(),
  description: aboutDescriptionSchema.required(),
};

const updateAboutSchema = {
  photo: aboutPhotoSchema,
  description: aboutDescriptionSchema,
};

module.exports = {
  aboutIdSchema,
  createAboutSchema,
  updateAboutSchema,
};
