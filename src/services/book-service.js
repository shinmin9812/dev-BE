const { bookDAO } = require('../db/dao/book-dao');
const { BookModel } = require('../db/schemas/book-schema');
class BookService {
	async findOneById({ ownerEmail, short_id: id }) {
		const book = await bookDAO.findOneByUserAndId({ ownerEmail, short_id: id });
		return book;
	}

	async findAllByUser(userEmail) {
		const books = await bookDAO.findAllByUser(userEmail);
		return books;
	}

	async findOneByUserAndId(userEmail, bookId) {
		const books = await bookDAO.findOneByUserAndId(userEmail, bookId);
		return books;
	}

	async findAll() {
		const books = await bookDAO.findAll();
		return books;
	}

	async createOne(params) {
		const book = await bookDAO.createOne(params);
		return book;
	}

	async createMany(params) {
		const books = await bookDAO.createMany(params);
		return books;
	}

	async updateOne(find, update) {
		const book = await bookDAO.updateOneByUserAndId(find, update, {
			new: true,
		});
		return book;
	}

	async deleteOne({ ownerEmail, short_id: id }) {
		const book = await bookDAO.deleteOneByUserAndId({
			ownerEmail,
			short_id: id,
		});
		return book;
	}

	async deleteAll() {
		const books = await bookDAO.deleteAll();
		return books;
	}

	async findSampleBook() {
		const sampleBook = await BookModel.find({
			name: '샘플단어장',
			ownerEmail: 'sample@test.com',
		});
		if (!sampleBook) {
			const err = new Error('단어장을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return sampleBook;
	}
	async createSample(userEmail) {
		const sampleBook = await bookDAO.createSample({
			name: '샘플단어장',
			description: '샘플단어장입니다',
			start_lang: 'english',
			end_lang: 'korean',
			ownerEmail: userEmail,
		});
		if (!sampleBook) {
			const err = new Error('샘플 단어장 생성에 실패하였습니다.');
			err.status = 404;
			throw err;
		}
		return sampleBook;
	}
}
const bookService = new BookService();
module.exports = { bookService };
