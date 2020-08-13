const express = require('express');
const HeroService = require('../services/hero');
const AboutService = require('../services/about');
const SkillsService = require('../services/skills');
const ProjectsService = require('../services/projects');
const CommunitiesService = require('../services/communities');

function dataApi(app) {
  const router = express.Router();
  const heroService = new HeroService();
  const aboutService = new AboutService();
  const skillsService = new SkillsService();
  const projectsService = new ProjectsService();
  const communitiesService = new CommunitiesService();

  app.use('/data', router);

  router.get('/', async function (request, response, next) {
    try {
      const hero = await heroService.getHero();
      const about = await aboutService.getAbout();
      const skills = await skillsService.getSkills();
      const projects = await projectsService.getProjects();
      const communities = await communitiesService.getCommunities();

      response.status(200).json({
        hero,
        about,
        skills,
        projects,
        communities,
        message: 'Data retrieved.',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = dataApi;
