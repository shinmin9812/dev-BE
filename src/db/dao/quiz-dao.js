const { QuizModel } = require('../schemas/quiz-schema');

class QuizDAO {
	//=====================지은 시작
	async createOne(params) {
		const quiz = await QuizModel.create(params);
		return quiz;
	}
	//=====================지은 끝

	//동균 시작================================================
	async findOneByIdAndUser({ short_id: id, ownerEmail: userEmail }) {
		const quiz = await QuizModel.findOne({
			short_id: id,
			ownerEmail: userEmail,
		});
		return quiz;
	}
	//동균 끝================================================

	//서연 시작=====================================
	async findQuizzesByDate(userEmail, dateInfo) {
		const { year, month, date } = dateInfo;
		const startOfDay = new Date(year, month - 1, date, 0, 0, 0);
		const endOfDay = new Date(year, month - 1, date, 23, 59, 59);

		const quiz = await QuizModel.find({
			ownerEmail: userEmail,
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		});

		return quiz;
	}

	async findQuizzesByMonth(userEmail, dateInfo) {
		const { year, month } = dateInfo;
		const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0);
		const endOfMonth = new Date(year, month, 0, 23, 59, 59);

		const quiz = await QuizModel.find({
			ownerEmail: userEmail,
			createdAt: { $gte: startOfMonth, $lte: endOfMonth },
		});

		return quiz;
	}
	//서연 끝======================================
}

const quizDAO = new QuizDAO();
module.exports = { quizDAO };
