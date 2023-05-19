const { quizDAO } = require('../db/dao/quiz-dao');

class QuizService {
	async createOne(params) {
		const quiz = await quizDAO.createOne(params);
		return quiz;
	}
}
const quizService = new QuizService();
module.exports = { quizService };
