const joi = require('@hapi/joi');

const projectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const projectNameSchema = joi.string().max(35);
const projectScreenshotsSchema = joi.array().items(joi.string().uri());
const projectDescriptionSchema = joi.string().max(280);
const projectUrlSchema = joi.string().uri();
const projectRepositorySchema = joi.string().uri();

const createProjectSchema = {
  name: projectNameSchema.required(),
  screenshots: projectScreenshotsSchema.required(),
  description: projectDescriptionSchema.required(),
  url: projectUrlSchema.required(),
  repository: projectRepositorySchema.required(),
};

const updateProjectSchema = {
  name: projectNameSchema,
  screenshots: projectScreenshotsSchema,
  description: projectDescriptionSchema,
  url: projectUrlSchema,
  repository: projectRepositorySchema,
};

module.exports = {
  projectIdSchema,
  createProjectSchema,
  updateProjectSchema,
};
