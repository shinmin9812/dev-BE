const { Router } = require('express');
const verifyToken = require('../middlewares/auth-handler');
const { asyncHandler } = require('../middlewares/async-handler');
const { quizService } = require('../services/quiz-service');
const quizRouter = Router();

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

module.exports = { quizRouter };
