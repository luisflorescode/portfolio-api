const MongoLib = require('../lib/mongo');

class AboutService {
  constructor() {
    this.collection = 'about';
    this.mongoDB = new MongoLib();
  }

  async getAbout() {
    const about = await this.mongoDB.get(this.collection);
    return about || {};
  }

  async createAbout({ about }) {
    const createdAboutId = await this.mongoDB.create(this.collection, about);
    return createdAboutId;
  }

  async updateAbout({ aboutId, about } = {}) {
    const updatedAboutId = await this.mongoDB.update(
      this.collection,
      aboutId,
      about
    );
    return updatedAboutId;
  }

  async deleteAbout({ aboutId }) {
    const deletedAbout = await this.mongoDB.delete(this.collection, aboutId);
    return deletedAbout;
  }
}

module.exports = AboutService;
