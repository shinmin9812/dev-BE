const { Router } = require('express');
const { BookModel } = require('../db/schemas/book-schema');
const { bookService } = require('../services/book-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');

const bookRouter = Router();

bookRouter.get(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const result = await bookService.findAllByUser(userEmail);
		res.status(200).json(result);
	}),
);

bookRouter.get(
	'/sample',
	asyncHandler(async (req, res) => {
		const result = await bookService.findSampleBook();
		res.status(200).json(result);
	}),
);

bookRouter.get(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const { userEmail } = req.user;
		const { id } = req.params;
		const result = await bookService.findOneByUserAndId(userEmail, id);
		res.status(200).json(result);
	}),
);

bookRouter.post(
	'/',
	verifyToken,
	asyncHandler(async (req, res) => {
		const newBook = req.body;
		newBook.ownerEmail = req.user.userEmail;
		if (
			!newBook.name ||
			!newBook.start_lang ||
			!newBook.end_lang ||
			!newBook.ownerEmail
		) {
			const err = new Error('단어장을 만들지 못했습니다');
			err.status = 400;
			throw err;
		}
		const result = await bookService.createOne(newBook);
		res.status(201).json(result);
	}),
);

bookRouter.delete(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const result = await bookService.deleteOne({
			ownerEmail: req.user.userEmail,
			short_id: req.params.id,
		});
		res.status(204).json({ message: '단어장이 삭제되었습니다' });
	}),
);

bookRouter.put(
	'/:id',
	verifyToken,
	asyncHandler(async (req, res) => {
		const updatedBook = req.body;
		const result = await bookService.updateOne(
			{ ownerEmail: req.user.userEmail, short_id: req.params.id },
			updatedBook,
		);
		res.status(200).json(result);
	}),
);

module.exports = { bookRouter };
