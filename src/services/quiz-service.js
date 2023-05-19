const { quizDAO } = require('../db/dao/quiz-dao');

class QuizService {
	//=====================지은 시작
	async createOne(params) {
		const quiz = await quizDAO.createOne(params);
		return quiz;
	}
	//=====================지은 끝
}
const quizService = new QuizService();
module.exports = { quizService };
