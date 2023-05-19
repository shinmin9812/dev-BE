const { QuizDAO } = require('../db/dao/quiz-dao');
const { QuizSchema } = require('../db/schemas/quiz-schema');

class QuizService {}

const quizService = new QuizService();
module.exports = { quizService };
