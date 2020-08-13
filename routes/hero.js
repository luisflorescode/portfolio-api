const express = require('express');
const HeroService = require('../services/hero');
const {
  heroIdSchema,
  createHeroSchema,
  updateHeroSchema,
} = require('../utils/schemas/hero');
const validationHandler = require('../utils/middleware/validationHandler');

function heroApi(app) {
  const router = express.Router();
  const heroService = new HeroService();

  app.use('/hero', router);

  router.get('/', async function (request, response, next) {
    try {
      const hero = await heroService.getHero();

      response.status(200).json({
        hero,
        message: 'Hero retrieved.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createHeroSchema), async function (
    request,
    response,
    next
  ) {
    const { body: hero } = request;
    try {
      const createdHeroId = await heroService.createHero({ hero });

      response.status(201).json({
        createdHeroId,
        message: 'Hero created.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:heroId',
    validationHandler({ heroId: heroIdSchema }, 'params'),
    validationHandler(updateHeroSchema),
    async function (request, response, next) {
      const { body: hero } = request;
      const { heroId } = request.params;

      try {
        const updatedHeroId = await heroService.updateHero({
          heroId,
          hero,
        });

        response.status(200).json({
          updatedHeroId,
          message: 'Hero updated.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:heroId',
    validationHandler({ heroId: heroIdSchema }, 'params'),
    async function (request, response, next) {
      const { heroId } = request.params;

      try {
        const deletedHeroId = await heroService.deleteHero({ heroId });

        response.status(200).json({
          deletedHeroId,
          message: 'Hero deleted.',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = heroApi;
