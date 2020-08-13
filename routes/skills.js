const express = require('express');
const SkillsService = require('../services/skills');
const {
  skillIdSchema,
  createSkillSchema,
  updateSkillSchema,
} = require('../utils/schemas/skills');
const validationHandler = require('../utils/middleware/validationHandler');

function skillsApi(app) {
  const router = express.Router();
  const skillsService = new SkillsService();

  app.use('/skills', router);

  router.get('/', async function (request, response, next) {
    try {
      const skills = await skillsService.getSkills();

      response.status(200).json({
        skills,
        message: 'Skills listed.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:skillId',
    validationHandler({ skillId: skillIdSchema }, 'params'),
    async function (request, response, next) {
      const { skillId } = request.params;

      try {
        const skill = await skillsService.getSkill({ skillId });

        response.status(200).json({
          skill,
          message: 'Skill retrieved.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/', validationHandler(createSkillSchema), async function (
    request,
    response,
    next
  ) {
    const { body: skill } = request;
    try {
      const createdSkillId = await skillsService.createSkill({ skill });

      response.status(201).json({
        createdSkillId,
        message: 'Skill created.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:skillId',
    validationHandler({ skillId: skillIdSchema }, 'params'),
    validationHandler(updateSkillSchema),
    async function (request, response, next) {
      const { body: skill } = request;
      const { skillId } = request.params;

      try {
        const updatedSkillId = await skillsService.updateSkill({
          skillId,
          skill,
        });

        response.status(200).json({
          updatedSkillId,
          message: 'Skill updated.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:skillId',
    validationHandler({ skillId: skillIdSchema }, 'params'),
    async function (request, response, next) {
      const { skillId } = request.params;

      try {
        const deletedSkillId = await skillsService.deleteSkill({ skillId });

        response.status(200).json({
          deletedSkillId,
          message: 'Skill deleted.',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = skillsApi;
