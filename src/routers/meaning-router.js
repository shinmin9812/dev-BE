const { Router } = require('express');
const { asyncHandler } = require('../middlewares/async-handler');
const { meaningService } = require('../services/meaning-service');

const meaningRouter = Router();

meaningRouter.get(
	'/:word',
	asyncHandler(async (req, res) => {
		const { word } = req.params;
		const { lang } = req.body;
		const meanings = await meaningService.getWordMeanings(lang, word);
		res.status(200).json(meanings);
	}),
);

module.exports = { meaningRouter };
