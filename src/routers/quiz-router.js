const { Router } = require('express');
const verifyToken = require('../middlewares/auth-handler');
const { asyncHandler } = require('../middlewares/async-handler');
const { quizService } = require('../services/quiz-service');
const quizRouter = Router();

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

module.exports = { quizRouter };
