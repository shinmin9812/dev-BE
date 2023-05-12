const { wordDAO } = require('../db/dao/word-dao');
const { bookDAO } = require('../db/dao/book-dao');
const { BookModel } = require('../db/schemas/book-schema');

class WordService {
	async findWordsByBook(userEmail, books) {
		const words = await wordDAO.findWordsByBook(userEmail, books);
		if (!words) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async findOneById(clue) {
		const word = await wordDAO.findOneById(clue);
		if (!word) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return word;
	}

	async findAllWordsOfThisUser(userEmail) {
		const words = await wordDAO.findAll(userEmail);
		if (!words) {
			const err = new Error('단어들을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async createOne(params) {
		/** 없는 단어장을 기재하여 추가하려한다면 */
		const existingBooks = await BookModel.find({ name: params.book });
		const result = existingBooks.filter(item => item.name === params.book);
		console.log(result);
		if (!result.length) {
			const err = new Error('해당 단어장이 존재하지 않습니다.');
			err.status = 422;
			throw err;
		}

		/** 잘못된 요청을 받았다면 */
		const word = await wordDAO.createOne(params);
		if (!word) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}

		return word;
	}

	async createMany(params) {
		/** 없는 단어장을 기재하여 추가하려한다면 에러 반환 */
		params.forEach(async (word) => {
			const existingBook = await BookModel.find({ name: word.book });
			if (!existingBook) {
				const err = new Error('해당 단어장이 존재하지 않습니다.');
				err.status = 422;
				throw err;
			}
			console.log(existingBook)
		})

		const words = await wordDAO.createMany(params);

		/** 잘못된 요청을 받았다면 */
		if (!words) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return words;
	}

	async updateOne(clue, update) {
		/** 수정할 단어의 전체 정보 */
		const currWord = await wordDAO.findOneById(clue);

		/** 해당 유저가 가진 단어장이 맞는지 */
		const allBooksOfThisUser = await BookModel.find({ ownerEmail: clue.userEmail });
		const thisBook = allBooksOfThisUser.filter(book => book.name === currWord.book);

		/** 없는 단어장을 기재하여 추가하려한다면 */
		if (!thisBook) {
			const err = new Error('해당 단어장이 존재하지 않습니다.');
			err.status = 422;
			throw err;
		}

		/** 잘못된 요청을 받았다면 */
		const newWord = await wordDAO.updateOne(clue, update);
		if (!newWord) {
			const err = new Error('단어를 수정하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return newWord;

	}

	async deleteOne(clue) {
		const word = await wordDAO.deleteOne(clue);
		if (!word) {
			const err = new Error('단어를 삭제하지 못했습니다.');
			err.status = 500;
			throw err;
		}
		return word;
	}

	async deleteAll() {
		const words = await wordDAO.deleteAll({});
		if (!words) {
			const err = new Error('단어를 삭제하지 못했습니다.');
			err.status = 500;
			throw err;
		}
		return words;
	}
}

const wordService = new WordService();
module.exports = { wordService };
