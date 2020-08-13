const MongoLib = require('../lib/mongo');

class HeroService {
  constructor() {
    this.collection = 'hero';
    this.mongoDB = new MongoLib();
  }

  async getHero() {
    const hero = await this.mongoDB.get(this.collection);
    return hero || {};
  }

  async createHero({ hero }) {
    const createdHeroId = await this.mongoDB.create(this.collection, hero);
    return createdHeroId;
  }

  async updateHero({ heroId, hero } = {}) {
    const updatedHeroId = await this.mongoDB.update(
      this.collection,
      heroId,
      hero
    );
    return updatedHeroId;
  }

  async deleteHero({ heroId }) {
    const deletedHero = await this.mongoDB.delete(this.collection, heroId);
    return deletedHero;
  }
}

module.exports = HeroService;
