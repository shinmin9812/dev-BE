const { QuizModel } = require('../schemas/quiz-schema');

class QuizDAO {
	//=====================지은 시작
	async createOne(params) {
		const quiz = await QuizModel.create(params);
		return quiz;
	}
	//=====================지은 끝
}

const quizDAO = new QuizDAO();
module.exports = { quizDAO };
