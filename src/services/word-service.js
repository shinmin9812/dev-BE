const { wordDTO } = require("../db/dto/word-dto");

class WordService {
  async findOneById({ short_id: id }) {
    // console.log('service : ' + { short_id: id })
    const word = await wordDTO.findOneById({ short_id: id });
    return word;
  }

  async findAll() {
    const word = await wordDTO.findAll();
    return word;
  }

  async createOne(params) {
    // console.log('service : ' + params)
    const word = await wordDTO.createOne(params);
    return word;
  }

  async createMany(params) {
    const word = await wordDTO.createMany(params);
    return word;
  }

  async updateOne(find, update) {
    const word = await wordDTO.updateOne(find, update);
    return word;
  }

  async deleteOne(params) {
    const word = await wordDTO.deleteOne(params)
    return word;
  }

  async deleteAll() {
    const word = await wordDTO.deleteAll({});
    return word;
  }
}

const wordService = new WordService();
module.exports = { wordService };
