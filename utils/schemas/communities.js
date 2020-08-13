const joi = require('@hapi/joi');

const communityIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const communityNameSchema = joi.string().max(35);
const communityRolSchema = joi.string().max(35);
const communityPhotoSchema = joi.string().uri();
const communityUrlSchema = joi.string().uri();

const createCommunitySchema = {
  name: communityNameSchema.required(),
  rol: communityRolSchema.required(),
  photo: communityPhotoSchema.required(),
  url: communityUrlSchema.required(),
};

const updateCommunitySchema = {
  name: communityNameSchema,
  rol: communityRolSchema,
  photo: communityPhotoSchema,
  url: communityUrlSchema,
};

module.exports = {
  communityIdSchema,
  createCommunitySchema,
  updateCommunitySchema,
};
