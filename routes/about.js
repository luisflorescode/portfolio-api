const express = require('express');
const AboutService = require('../services/about');
const {
  aboutIdSchema,
  createAboutSchema,
  updateAboutSchema,
} = require('../utils/schemas/about');
const validationHandler = require('../utils/middleware/validationHandler');

function aboutApi(app) {
  const router = express.Router();
  const aboutService = new AboutService();

  app.use('/about', router);

  router.get('/', async function (request, response, next) {
    try {
      const about = await aboutService.getAbout();

      response.status(200).json({
        about,
        message: 'About retrieved.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createAboutSchema), async function (
    request,
    response,
    next
  ) {
    const { body: about } = request;
    try {
      const createdAboutId = await aboutService.createAbout({ about });

      response.status(201).json({
        createdAboutId,
        message: 'About created.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:aboutId',
    validationHandler({ aboutId: aboutIdSchema }, 'params'),
    validationHandler(updateAboutSchema),
    async function (request, response, next) {
      const { body: about } = request;
      const { aboutId } = request.params;

      try {
        const updatedAboutId = await aboutService.updateAbout({
          aboutId,
          about,
        });

        response.status(200).json({
          updatedAboutId,
          message: 'About updated.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:aboutId',
    validationHandler({ aboutId: aboutIdSchema }, 'params'),
    async function (request, response, next) {
      const { aboutId } = request.params;

      try {
        const deletedAboutId = await aboutService.deleteAbout({ aboutId });

        response.status(200).json({
          deletedAboutId,
          message: 'About deleted.',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = aboutApi;
