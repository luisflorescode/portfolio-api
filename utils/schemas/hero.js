const joi = require('@hapi/joi');

const heroIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const heroBackgroundSchema = joi.string().uri();
const heroTextSchema = joi.string().max(35);

const createHeroSchema = {
  background: heroBackgroundSchema.required(),
  text: heroTextSchema.required(),
};

const updateHeroSchema = {
  background: heroBackgroundSchema,
  text: heroTextSchema,
};

module.exports = {
  heroIdSchema,
  createHeroSchema,
  updateHeroSchema,
};
