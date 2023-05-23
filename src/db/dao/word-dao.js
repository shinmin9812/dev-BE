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

	async findWordsByBookAndStatus(statuses, bookIds) {
		const words = await WordModel.find({
			bookId: { $in: bookIds },
			status: { $in: statuses },
		});
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
		const word = await WordModel.findOneAndUpdate(
			{ short_id: clue.short_id },
			update,
			{
				new: true,
			},
		);
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

	//동균 시작================================================
	async findManyByIds(wordIds) {
		const words = await WordModel.find({ short_id: { $in: wordIds } });
		return words;
	}
	//동균 끝================================================

	//서연 시작=====================================
	async findWordsByDate(userEmail, dateInfo) {
		const { year, month, date } = dateInfo;
		const startOfDay = new Date(year, month - 1, date, 0, 0, 0);
		const endOfDay = new Date(year, month - 1, date, 23, 59, 59);

		const words = await WordModel.find({
			ownerEmail: userEmail,
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		});

		return words;
	}

	async findWordsByMonth(userEmail, dateInfo) {
		const { year, month } = dateInfo;
		const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0);
		const endOfMonth = new Date(year, month, 0, 23, 59, 59);

		const words = await WordModel.find({
			ownerEmail: userEmail,
			createdAt: { $gte: startOfMonth, $lte: endOfMonth },
		});

		return words;
	}

	async findWordsByIds(ids) {
		const words = WordModel.find({
			short_id: { $in: ids }
		});

		return words;
	}
	//서연 끝======================================
}

const wordDAO = new WordDAO();

module.exports = { wordDAO };
