const { Router } = require('express');
const { bookService } = require('../services/book-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');

const bookRouter = Router();

bookRouter.get('/', verifyToken, asyncHandler(async (req, res) => {
	const result = await bookService.findAll();
	res.status(200).json(result);
}));

bookRouter.get('/me', verifyToken, asyncHandler(async (req, res, next) => {
	const {userEmail} = req.user
	const result = await bookService.findAllByUser({ ownerEmail: userEmail });
	if (!result) {
		return next(new Error('사용자의 단어장이 없습니다'));  
	}
	res.status(200).json(result);
}));

bookRouter.post('/me', verifyToken, asyncHandler(async (req, res, next) => {
	const newBook = req.body;  
	newBook.ownerEmail = req.user.email;  
	if (!newBook.name || !newBook.start_lang || !newBook.end_lang || !newBook.ownerEmail) {
		return next(new Error('Missing required fields')); 
	}
	const result = await bookService.createOne(newBook);
	res.status(201).json(result);
}));

bookRouter.delete('/me/:id', verifyToken, asyncHandler(async (req, res, next) => {
	const result = await bookService.deleteOne({ ownerEmail: req.user.email, short_id: req.params.id });
	if (!result) {
		return next(new Error('No book found for this user with the provided id'));  
	}
	res.status(200).json({ message: "단어장이 삭제되었습니다" });
}));

bookRouter.put('/me/:id', verifyToken, asyncHandler(async (req, res, next) => {
	const updatedBook = req.body;
	const result = await bookService.updateOne({ ownerEmail: req.user.email, short_id: req.params.id }, updatedBook);
	if (!result) {
		return next(new Error('No book found for this user with the provided id')); 
	}
	res.status(200).json(result);
}));

module.exports = { bookRouter };

