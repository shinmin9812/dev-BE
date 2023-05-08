const { WordModel, BookModel, BookCaseModel } = require("../schemas/word-schema");

class WordDTO {
  async findOneById() { }
  async findAll() { }
  async createOne(params) { WordModel.create(params); }
  async createMany() { }
  async updateOne() { }
  async deleteOne() { }
  async deleteAll() { }
}

class BookDTO {
  async findById() { }
  async findAll() { }
  async createOne() { }
  async createMany() { }
  async updateOne() { }
  async deleteOne() { }
  async deleteAll() { }
}

class BookCaseDTO {
  async findById() { }
  async findAll() { }
  async createOne() { }
  async createMany() { }
  async updateOne() { }
  async deleteOne() { }
  async deleteAll() { }
}

module.exports = { WordDTO, BookDTO, BookCaseDTO };