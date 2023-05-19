const { Router } = require('express');
const verifyToken = require('../middlewares/auth-handler');
const { asyncHandler } = require('../middlewares/async-handler');
const QuizModel = require('../db/schemas/quiz-schema');
const { wordService } = require('../services/word-service');
const quizRouter = Router();

//민석 시작===========================================
quizRouter.get(
	'/four-prong',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const bookIds = req.query.bookId.split(',');
		const number = parseInt(req.query.number);
		const statuses = req.query.status.split(',').map(Number);

		const response = await wordService.findWordsByBookAndStatus(
			userEmail,
			statuses,
			bookIds,
			number
		);

		res.status(200).json(response);
	}),
);
//민석 끝===========================================

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
