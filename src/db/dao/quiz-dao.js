const { QuizModel } = require('../schemas/quiz-schema');

class QuizDAO {
	async createOne(params) {
		const quiz = await QuizModel.create(params);
		return quiz;
	}
}

const quizDAO = new QuizDAO();
module.exports = { quizDAO };
