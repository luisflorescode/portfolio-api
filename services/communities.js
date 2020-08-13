const MongoLib = require('../lib/mongo');

class CommunitiesService {
  constructor() {
    this.collection = 'communities';
    this.mongoDB = new MongoLib();
  }

  async getCommunities() {
    const communities = await this.mongoDB.getAll(this.collection);
    return communities || [];
  }

  async getCommunity({ communityId }) {
    const community = await this.mongoDB.get(this.collection, communityId);
    return community || {};
  }

  async createCommunity({ community }) {
    const createdCommunityId = await this.mongoDB.create(
      this.collection,
      community
    );
    return createdCommunityId;
  }

  async updateCommunity({ communityId, community } = {}) {
    const updatedCommunityId = await this.mongoDB.update(
      this.collection,
      communityId,
      community
    );
    return updatedCommunityId;
  }

  async deleteCommunity({ communityId }) {
    const deletedCommunity = await this.mongoDB.delete(
      this.collection,
      communityId
    );
    return deletedCommunity;
  }
}

module.exports = CommunitiesService;
