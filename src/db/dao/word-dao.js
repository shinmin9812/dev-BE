const { WordModel } = require('../schemas/word-schema');

class WordDAO {
	/**단어장에 따라 단어찾기 */
	async findWordsByBook(books) {
		const words = await WordModel.find({ book: books });
		return words;
	}

	async findOneById({ short_id: id }) {
		// console.log('DAO : ' + { short_id: id })
		const word = await WordModel.findOne({ short_id: id });
		return word;
	}

	async findAll() {
		const word = await WordModel.find({});
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
		const word = await WordModel.findOneAndUpdate(find, update);
		return word;
	}

	async deleteOne(params) {
		const word = await WordModel.findOneAndDelete(params);
		return word;
	}

	async deleteAll() {
		const word = await WordModel.deleteMany({});
		return word;
	}
}

const wordDAO = new WordDAO();

module.exports = { wordDAO };
