const { Router } = require('express');
const { wordModel, WordModel } = require('../db/schemas/word-schema');
const { wordService } = require('../services/word-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');
const { addAdminWords } = require('../utils/addAdminWords');
const wordRouter = Router();

wordRouter.get(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		if (Object.keys(req.query).length > 0) {
			const wordsByBook = await wordService.findWordsByBook(
				userEmail,
				req.query.bookId,
			);
			res.status(200).json(wordsByBook);
		} else {
			/**db에 있는 모든 단어 찾기 */
			const result = await wordService.findAllWordsOfThisUser(userEmail);
			res.status(200).json(result);
		}
	}),
);

/** 비회원이 볼 수 있는 샘플단어장 */
wordRouter.get(
	'/sample',
	asyncHandler(async (req, res) => {
		const result = await wordService.findSampleWords();
		res.status(200).json(result);
	}),
);

/** status에 따른 words 반환 */
wordRouter.get(
	'/status/:status',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { status } = req.params;
		const result = await wordService.findWordsByStatus(userEmail, status);
		res.status(200).json(result);
	}),
);

//서연 시작===========================
wordRouter.get(
	'/calendar',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const dateInfo = req.query;
		const result = await wordService.findWordsBySelectedDate(
			userEmail,
			dateInfo,
		);
		res.status(200).json(result);
	}),
);
//서연 끝=============================

/** word 하나만 id로 get */
wordRouter.get(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { ownerEmail: userEmail, short_id: id };
		const result = await wordService.findOneById(clue);
		res.status(200).json(result);
	}),
);

//서연 시작===========================
//여러개의 word를 id로 가져오기
wordRouter.get(
	'/multiple/:ids',
	asyncHandler(async (req, res) => {
		const ids = req.params.ids.split(',');
		const result = await wordService.findWordsByIds(ids);

		res.status(200).json(result);
	}),
);
//서연 끝=============================

/** word 를 생성 */
wordRouter.post(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		/**배열로 여러개 생성하려한다면 */
		if (Array.isArray(req.body)) {
			const newWordsArray = req.body;
			newWordsArray.forEach(word => {
				word.ownerEmail = userEmail;
			});
			const result = await wordService.createMany(newWordsArray);
			res.status(200).json(result);
		} else {
			/**하나만 생성하려한다면 */
			const newWord = req.body;
			newWord.ownerEmail = userEmail;
			const result = await wordService.createOne(newWord);
			res.status(200).json(result);
		}
	}),
);

/** word 하나를 삭제 */
wordRouter.delete(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { ownerEmail: userEmail, short_id: id };
		const result = await wordService.deleteOne(clue);
		res.status(204).json('삭제 성공');
	}),
);

/** word 전체를 변경(암기상태 포함) */
wordRouter.patch(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { short_id: id, ownerEmail: userEmail };
		const updatedWord = { ...req.body };
		const result = await wordService.updateOne(clue, updatedWord);
		res.status(200).json(result);
	}),
);

/** 단어 여러개의 암기상태(status)를 변경 */
wordRouter.patch(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { updates } = req.body;
		const results = [];
		for (const update of updates) {
			const { short_id, status } = update;
			const clue = { short_id, ownerEmail: userEmail };
			const updateObj = { $set: { status } };
			const result = await wordService.findWordsAndUpdate(clue, updateObj);
			results.push(result);
		}
		res.status(200).json(results);
	}),
);

/**관리자가 한번에 샘플 단어장 생성시 사용 */
wordRouter.post(
	'/admin',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		/**배열로 여러개 생성하려한다면 */
		await addAdminWords(req, userEmail, res);
	}),
);

module.exports = { wordRouter };
