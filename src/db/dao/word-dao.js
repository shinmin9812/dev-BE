const { WordModel } = require('../schemas/word-schema');

class WordDAO {
	/**단어장에 따라 단어찾기 */
	async findWordsByBook(userEmail, books) {
		const words = await WordModel.find({ ownerEmail: userEmail, book: books });
		return words;
	}

	async findOneById(clue) {
		const word = await WordModel.findOne(clue);
		return word;
	}

	async findAll(userEmail) {
		const word = await WordModel.find({ ownerEmail: userEmail });
		return word;
	}

	async createOne(params) {
		const { word, meanings, book } = params;
		// console.log(params.word)
		const hi = await WordModel.create(
			// { word: params.word }, { meanings: params.meanings }, { book: params.book }
		);
		return hi;
	}

	async createMany(params) {
		const word = await WordModel.insertMany(params);
		return word;
	}

	async updateOne(find, update) {
		const word = await WordModel.findOneAndUpdate(find, update, {
			new: true
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
