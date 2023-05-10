const { BookDAO } = require('../db/dto/book-dao');

class BookService {
	async findById({ short_id: id }) {
		const book = await BookDAO.findOne({ short_id: id });
		if (!book) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return book;
	}
	async findAll() {
		const book = await BookDAO.find({});
		if (!book) {
			const err = new Error('단어장을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return book;
	}

	async createOne() {
		// const { english, korean, pronounce, description } = params;
		// start_lang,end_lang
		const book = await BookDAO.create(params);
		if (!book) {
			const err = new Error('새로운 단어장을 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return book;
	}

	async createMany(params) {
		const books = await BookDAO.insertMany(params);
		if (!books) {
			const err = new Error('새로운 단어장을 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return books;
	}

	async updateOne(find, update) {
		const book = await BookDAO.findOneAndUpdate(find, update);
		if (!book) {
			const err = new Error('단어장을 수정하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return book;
	}

	async deleteOne(params) {
		const book = await BookDAO.findOneAndDelete(params);
		if (!book) {
			const err = new Error('단어장을 삭제하지 못했습니다.');
			err.status = 500;
			throw err;
		}
		return book;
	}

	async deleteAll() {
		const books = await BookDAO.deleteMany({});
		if (!books) {
			const err = new Error('단어장을 삭제하지 못했습니다.');
			err.status = 500;
			throw err;
		}
		return books;
	}
}

const bookService = new BookService();
module.exports = { bookService };
