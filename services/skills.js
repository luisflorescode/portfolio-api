const MongoLib = require('../lib/mongo');

class SkillsService {
  constructor() {
    this.collection = 'skills';
    this.mongoDB = new MongoLib();
  }

  async getSkills() {
    const skills = await this.mongoDB.getAll(this.collection);
    return skills || [];
  }

  async getSkill({ skillId }) {
    const skill = await this.mongoDB.get(this.collection, skillId);
    return skill || {};
  }

  async createSkill({ skill }) {
    const createdSkillId = await this.mongoDB.create(this.collection, skill);
    return createdSkillId;
  }

  async updateSkill({ skillId, skill } = {}) {
    const updatedSkillId = await this.mongoDB.update(
      this.collection,
      skillId,
      skill
    );
    return updatedSkillId;
  }

  async deleteSkill({ skillId }) {
    const deletedSkill = await this.mongoDB.delete(this.collection, skillId);
    return deletedSkill;
  }
}

module.exports = SkillsService;
