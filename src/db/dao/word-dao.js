const { WordModel } = require('../schemas/word-schema');

class WordDAO {
	/**단어장에 따라 단어찾기 */
	async findWordsByBook(userEmail, bookId) {
		const words = await WordModel.find({
			ownerEmail: userEmail,
			bookId: bookId,
		});
		return words;
	}

	async findOneById(clue) {
		const word = await WordModel.findOne({ short_id: clue.short_id });
		return word;
	}

	async findSampleWords(bookId) {
		const words = await WordModel.find({ bookId: bookId });
		console.log(bookId);
		return words;
	}

	async findAll(userEmail, status) {
		const query = { ownerEmail: userEmail };
		if (status) {
			query.status = status;
		}
		const words = await WordModel.find(query);
		return words;
	}

	async createOne(params) {
		const word = await WordModel.create(params);
		return word;
	}

	async createMany(params) {
		const word = await WordModel.insertMany(params);
		return word;
	}

	async updateOne(clue, update) {
		const word = await WordModel.findOneAndUpdate(clue.short_id, update, {
			new: true,
		});
		return word;
	}

	async findWordsAndUpdate(clue, update) {
		const word = await WordModel.findOneAndUpdate(clue, update, {
			new: true,
		});
		return word;
	}

	async deleteOne(clue) {
		const word = await WordModel.findOneAndDelete(clue);
		return word;
	}

	async deleteAll() {
		const word = await WordModel.deleteMany({});
		return word;
	}
}

const wordDAO = new WordDAO();

module.exports = { wordDAO };
