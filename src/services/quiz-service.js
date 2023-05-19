const { quizDAO } = require('../db/dao/quiz-dao');
const { wordDAO } = require('../db/dao/word-dao');

class QuizService {
	//=====================지은 시작
	async createOne(params) {
		const quiz = await quizDAO.createOne(params);
		return quiz;
	}
	//=====================지은 끝

	//동균 시작================================================
	async getQuizAnswers({ userEmail, short_id }) {
		const quiz = await quizDAO.findOneByIdAndUser({
			short_id,
			ownerEmail: userEmail,
		});

		const correctWords = await wordDAO.findManyByIds(quiz.correctWords);
		const updatedCorrectWords = correctWords.map(word => {
			return { ...word.toObject(), isCorrect: true };
		});

		const incorrectWords = await wordDAO.findManyByIds(quiz.incorrectWords);
		const updatedInCorrectWords = incorrectWords.map(word => {
			return { ...word.toObject(), isCorrect: false };
		});

		const quizAnswers = [...updatedCorrectWords, ...updatedInCorrectWords];

		return quizAnswers;
	}
	//동균 끝================================================
}
const quizService = new QuizService();
module.exports = { quizService };
