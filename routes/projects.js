const express = require('express');
const ProjectsService = require('../services/projects');
const {
  projectIdSchema,
  createProjectSchema,
  updateProjectSchema,
} = require('../utils/schemas/projects');
const validationHandler = require('../utils/middleware/validationHandler');

function projectsApi(app) {
  const router = express.Router();
  const projectsService = new ProjectsService();

  app.use('/projects', router);

  router.get('/', async function (request, response, next) {
    try {
      const projects = await projectsService.getProjects();

      response.status(200).json({
        projects,
        message: 'Projects listed.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:projectId',
    validationHandler({ projectId: projectIdSchema }, 'params'),
    async function (request, response, next) {
      const { projectId } = request.params;

      try {
        const project = await projectsService.getProject({ projectId });

        response.status(200).json({
          project,
          message: 'Project retrieved.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/', validationHandler(createProjectSchema), async function (
    request,
    response,
    next
  ) {
    const { body: project } = request;
    try {
      const createdProjectId = await projectsService.createProject({ project });

      response.status(201).json({
        createdProjectId,
        message: 'Project created.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:projectId',
    validationHandler({ projectId: projectIdSchema }, 'params'),
    validationHandler(updateProjectSchema),
    async function (request, response, next) {
      const { body: project } = request;
      const { projectId } = request.params;

      try {
        const updatedProjectId = await projectsService.updateProject({
          projectId,
          project,
        });

        response.status(200).json({
          updatedProjectId,
          message: 'Project updated.',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:projectId',
    validationHandler({ projectId: projectIdSchema }, 'params'),
    async function (request, response, next) {
      const { projectId } = request.params;

      try {
        const deletedProjectId = await projectsService.deleteProject({
          projectId,
        });

        response.status(200).json({
          deletedProjectId,
          message: 'Project deleted.',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = projectsApi;
