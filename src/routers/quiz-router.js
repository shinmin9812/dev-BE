const { Router } = require('express');
const verifyToken = require('../middlewares/auth-handler');
const { asyncHandler } = require('../middlewares/async-handler');
const QuizModel = require('../db/schemas/quiz-schema');
const quizRouter = Router();
const { quizService } = require('../services/quiz-service');

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

//동균 시작================================================
quizRouter.get(
	'/answers/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const result = await quizService.getQuizAnswers({
			userEmail,
			short_id: id,
		});
		res.status(200).json(result);
	}),
);
//동균 끝================================================

module.exports = { quizRouter };
