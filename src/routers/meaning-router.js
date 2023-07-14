const { Router } = require('express');
const { asyncHandler } = require('../middlewares/async-handler');
const { meaningService } = require('../services/meaning-service');

const meaningRouter = Router();

meaningRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const { lang, word } = req.query;
		const meanings = await meaningService.getWordMeanings(lang, word);
		res.status(200).json(meanings);
	}),
);

module.exports = { meaningRouter };
