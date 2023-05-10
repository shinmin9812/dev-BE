const { Router } = require('express');
const {
	WordModel,
	BookModel,
	BookCaseModel,
} = require('../db/schemas/word-schema');
const { wordDAO } = require('../db/dao/word-dao');
//bookDAO를 짜신후에 변경, 사용하시면 되겠습니다
const bookRouter = Router();

bookRouter.get('/', async (req, res) => {
	const result = await BookModel.find({});
	res.json(result);
});

bookRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await BookModel.find({ short_id: id });
	res.json(result);
});

bookRouter.post('/', async (req, res) => {
	const newBook = req.body;
	console.log(newBook);
	const result = await BookModel.create(newBook);
	res.json(result);
});

bookRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const result = await BookModel.findOneAndDelete({ short_id: id });
	res.json(result);
});

bookRouter.put('/short-id/:id', async (req, res) => {
	const { id } = req.params;
	const updatedBook = req.body;
	const result = await BookModel.findOneAndUpdate(
		{ short_id: id },
		updatedBook,
	);
	res.json(result);
});

bookRouter.put('/name/:currName', async (req, res) => {
	const { currName } = req.params;
	console.log(currName);
	const updatedBook = req.body;
	const result = await BookModel.findOneAndUpdate(
		{ name: currName },
		updatedBook,
		{ new: true },
	);
	res.json(result);
});

module.exports = { bookRouter };
