const { Router } = require('express');
const { WordModel } = require('../db/schemas/word-schema');
const { wordDAO } = require('../db/dao/word-dao');
const { wordService } = require('../services/word-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');

const wordRouter = Router();


/**클리어 */
wordRouter.get(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		if (Object.keys(req.query).length > 0) {
			const wordsByBook = await wordService.findWordsByBook(userEmail, req.query.books);
			res.status(200).json(wordsByBook);
		} else {
			/**db에 있는 모든 단어 찾기 */
			const result = await wordService.findAllWordsOfThisUser(userEmail);
			res.status(200).json(result);
		}
	}),
);

/**클리어 */
wordRouter.get(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { ownerEmail: userEmail, short_id: id }
		const result = await wordService.findOneById(clue);
		res.status(200).json(result);
	}),
);

/**클리어 */
wordRouter.post(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		if (Array.isArray(req.body)) {
			const newWordsArray = req.body;
			newWordsArray.forEach((word) => { word.ownerEmail = userEmail })
			console.log(newWordsArray);
			const result = await wordService.createMany(newWordsArray);
			// const result = await WordModel.insertMany(newWordsArray);
			console.log(result)
			// res.status(200).json(result);
		} else {
			const newWord = req.body;
			newWord.ownerEmail = userEmail;
			const result = await WordModel.create(newWord);
			console.log(result);
			res.status(200).json(result);
		}
	}),
);
/**클리어 */
wordRouter.delete(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { ownerEmail: userEmail, short_id: id }
		const result = await wordService.deleteOne(clue);
		console.log(result);
		res.status(204).json('삭제 성공');
	}),
);

/**클리어 */
wordRouter.put(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const clue = { short_id: id, ownerEmail: userEmail }
		const updatedWord = { ...req.body };
		// console.log(updatedWord)
		const result = await wordService.updateOne(clue, updatedWord);
		res.status(200).json(result);
	}),
);

module.exports = { wordRouter };
