const { Router } = require('express');
const verifyToken = require('../middlewares/auth-handler');
const { asyncHandler } = require('../middlewares/async-handler');
const quizRouter = Router();
const { quizService } = require('../services/quiz-service');

//=====================지은 시작
quizRouter.post(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const quizData = {
			...req.body,
			ownerEmail: userEmail,
		};
		const result = await quizService.createOne(quizData);
		res.status(200).json(result);
	}),
);
//=====================지은 끝

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
