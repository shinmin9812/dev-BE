const { WordModel, BookModel, BookCaseModel } = require("../schemas/word-schema");

class WordDTO {
  async findOneById({ short_id: id }) {
    // console.log('dto : ' + { short_id: id })
    const word = await WordModel.findOne({ short_id: id });
    return word;
  }

  async findAll() {
    const word = await WordModel.find({});
    return word;
  }

  async createOne(params) {
    const { english, korean, pronounce, description } = params;
    const word = await WordModel.create({ english, korean, pronounce, description });
    return word;
  }

  async createMany(params) {
    const word = await WordModel.insertMany(params);
    return word;
  }

  async updateOne(find, update) {
    const word = await WordModel.findOneAndUpdate(find, update);
    return word;
  }

  async deleteOne(params) {
    const word = await WordModel.findOneAndDelete(params)
    return word;
  }

  async deleteAll() {
    const word = await WordModel.deleteMany({});
    return word;
  }

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

const wordDTO = new WordDTO();
const bookDTO = new BookDTO();
const bookCaseDTO = new BookCaseDTO();

module.exports = { wordDTO, bookDTO, bookCaseDTO };