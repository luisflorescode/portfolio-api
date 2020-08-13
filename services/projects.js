const MongoLib = require('../lib/mongo');

class ProjectsService {
  constructor() {
    this.collection = 'projects';
    this.mongoDB = new MongoLib();
  }

  async getProjects() {
    const projects = await this.mongoDB.getAll(this.collection);
    return projects || [];
  }

  async getProject({ projectId }) {
    const project = await this.mongoDB.get(this.collection, projectId);
    return project || {};
  }

  async createProject({ project }) {
    const createdProjectId = await this.mongoDB.create(
      this.collection,
      project
    );
    return createdProjectId;
  }

  async updateProject({ projectId, project } = {}) {
    const updatedProjectId = await this.mongoDB.update(
      this.collection,
      projectId,
      project
    );
    return updatedProjectId;
  }

  async deleteProject({ projectId }) {
    const deletedProject = await this.mongoDB.delete(
      this.collection,
      projectId
    );
    return deletedProject;
  }
}

module.exports = ProjectsService;
