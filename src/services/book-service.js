const { BookDAO } = require("../db/dto/book-dao");

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
    const book = await BookModel.create(params);
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

const bookService = new BookService();
module.exports = { bookService };