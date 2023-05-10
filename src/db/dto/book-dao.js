const { WordModel, BookModel} = require("../schemas/word-schema");

class WordDAO {
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
    // const { english, korean, pronounce, description } = params;
    const word = await WordModel.create(params);
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

class BookDAO {
  async findById({ short_id: id }) { 
    const book = await BookModel.findOne({ short_id: id });
    return book;
  }
  async findAll() {
    const book = await BookModel.find({});
    return book;
  }
  async createOne() {
    // const { english, korean, pronounce, description } = params;
    // start_lang,end_lang 
    const book = await BookModel.create({ english, korean, pronounce, description });
    return book;
  }

  async createMany(params) {
    const book = await BookModel.insertMany(params);
    return book;
  }

  async updateOne(find, update) {
    const book = await BookModel.findOneAndUpdate(find, update);
    return book;
  }

  async deleteOne(params) {
    const book = await BookModel.findOneAndDelete(params)
    return book;
  }

  async deleteAll() {
    const book = await BookModel.deleteMany({});
    return book;
  }
}

// class BookCaseDAO {
//   async findById({ short_id: id }) { 
//     const bookCase = await BookCaseModel.findOne({ short_id: id });
//     return bookCase;
//   }
//   async findAll() {
//     const bookCase = await BookCaseModel.find({});
//     return bookCase;
//   }
//   async createOne() {
//     // const { english, korean, pronounce, description } = params;
//     const bookCase = await BookCaseModel.create({ english, korean, pronounce, description });
//     return bookCase;
//   }

//   async createMany(params) {
//     const bookCase = await BookCaseModel.insertMany(params);
//     return bookCase;
//   }

//   async updateOne(find, update) {
//     const bookCase = await BookCaseModel.findOneAndUpdate(find, update);
//     return bookCase;
//   }

//   async deleteOne(params) {
//     const bookCase = await BookCaseModel.findOneAndDelete(params)
//     return bookCase;
//   }

//   async deleteAll() {
//     const bookCase = await BookCaseModel.deleteMany({});
//     return bookCase;
//   }
// }

const wordDAO = new WordDAO();
const bookDAO = new BookDAO();
// const bookCaseDAO = new BookCaseDAO();

module.exports = { wordDAO, bookDAO};