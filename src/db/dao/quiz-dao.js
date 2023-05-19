const { QuizModel } = require('../schemas/quiz-schema');

class QuizDAO {
	//동균 시작================================================
	async findOneByIdAndUser({ short_id: id, ownerEmail: userEmail }) {
		const quiz = await QuizModel.findOne({
			short_id: id,
			ownerEmail: userEmail,
		});
		return quiz;
	}
	//동균 끝================================================
}

const quizDAO = new QuizDAO();
module.exports = { quizDAO };
