const { Router } = require('express');
const verifyToken = require('../middlewares/auth-handler');
const QuizModel = require('../db/schemas/quiz-schema');
const quizRouter = Router();

quizRouter.post(
	'/',
	verifyToken, // 토큰 확인?
	asyncHandler(async (req, res) => {
		const result = req.body;
		const test = await QuizModel.create(req.body);
		result.ownerEmail = req.user.userEmail;
		res.status(200).json(test);
	}),
);

module.exports = { quizRouter };
