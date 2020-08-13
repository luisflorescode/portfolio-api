const express = require('express');
const CommunitiesService = require('../services/communities');
const {
  communityIdSchema,
  createCommunitySchema,
  updateCommunitySchema,
} = require('../utils/schemas/communities');
const validationHandler = require('../utils/middleware/validationHandler');

function communitiesApi(app) {
  const router = express.Router();
  const communitiesService = new CommunitiesService();

  app.use('/communities', router);

  router.get('/', async function (request, response, next) {
    try {
      const communities = await communitiesService.getCommunities();

      response.status(200).json({
        communities,
        message: 'Communities listed.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:communityId',
    validationHandler({ communityId: communityIdSchema }, 'params'),
    async function (request, response, next) {
      const { communityId } = request.params;

      try {
        const community = await communitiesService.getCommunity({
          communityId,
        });

        response.status(200).json({
          community,
          message: 'Community retrieved.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/', validationHandler(createCommunitySchema), async function (
    request,
    response,
    next
  ) {
    const { body: community } = request;
    try {
      const createdCommunityId = await communitiesService.createCommunity({
        community,
      });

      response.status(201).json({
        createdCommunityId,
        message: 'Community created.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:communityId',
    validationHandler({ communityId: communityIdSchema }, 'params'),
    validationHandler(updateCommunitySchema),
    async function (request, response, next) {
      const { body: community } = request;
      const { communityId } = request.params;

      try {
        const updatedCommunityId = await communitiesService.updateCommunity({
          communityId,
          community,
        });

        response.status(200).json({
          updatedCommunityId,
          message: 'Community updated.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:communityId',
    validationHandler({ communityId: communityIdSchema }, 'params'),
    async function (request, response, next) {
      const { communityId } = request.params;

      try {
        const deletedCommunityId = await communitiesService.deleteCommunity({
          communityId,
        });

        response.status(200).json({
          deletedCommunityId,
          message: 'Community deleted.',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = communitiesApi;
