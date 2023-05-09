const { wordDAO } = require("../db/dao/word-dao");

class WordService {
  async findOneById({ short_id: id }) {
    // console.log('service : ' + { short_id: id })
    const word = await wordDAO.findOneById({ short_id: id });
    return word;
  }

  async findAll() {
    const word = await wordDAO.findAll();
    return word;
  }

  async createOne(params) {
    // console.log('service : ' + params)
    const word = await wordDAO.createOne(params);
    return word;
  }

  async createMany(params) {
    const word = await wordDAO.createMany(params);
    return word;
  }

  async updateOne(find, update) {
    const word = await wordDAO.updateOne(find, update);
    return word;
  }

  async deleteOne(params) {
    const word = await wordDAO.deleteOne(params)
    return word;
  }

  async deleteAll() {
    const word = await wordDAO.deleteAll({});
    return word;
  }
}

const wordService = new WordService();
module.exports = { wordService };
