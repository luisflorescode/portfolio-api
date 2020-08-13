const joi = require('@hapi/joi');

const skillIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const skillNameSchema = joi.string().max(35);
const skillLogoSchema = joi.string().uri();

const createSkillSchema = {
  name: skillNameSchema.required(),
  logo: skillLogoSchema.required(),
};

const updateSkillSchema = {
  name: skillNameSchema,
  logo: skillLogoSchema,
};

module.exports = {
  skillIdSchema,
  createSkillSchema,
  updateSkillSchema,
};
