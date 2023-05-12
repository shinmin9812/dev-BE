const { Router } = require('express');
const { bookService } = require('../services/book-service');
const { asyncHandler } = require('../middlewares/async-handler');
const verifyToken = require('../middlewares/auth-handler');

const bookRouter = Router();

bookRouter.get('/', 
	asyncHandler(async (req, res) => {
		const result = await bookService.findAll();
		res.status(200).json(result);
	})
);

bookRouter.get('/:id', 
  asyncHandler(async (req, res) => {
		const { id } = req.params;
		const result = await bookService.findOneById({ short_id: id });
		if (!result) {
			return next(new Error('Book not found'));  
		}
		res.status(200).json(result);
	})
);

bookRouter.post('/', 
  asyncHandler(async (req, res) => {
		const newBook = req.body;  // 포스트맨 바디가 여기 담겨온다
		console.log(newBook);
		if (!newBook.name || !newBook.start_lang || !newBook.end_lang || !newBook.ownerEmail) {
			return next(new Error('Missing required fields')); 
		}
		const result = await bookService.createOne(newBook);
		res.status(201).json(result);
	})
);

bookRouter.delete('/:id', 
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const result = await bookService.deleteOne({ short_id: id });
		if (!result) {
			return next(new Error('Book not found'));  
		}
		res.status(200).json({ message: "단어장이 삭제되었습니다" });
	})
);

bookRouter.put('/short-id/:id', 
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const updatedBook = req.body;
		if (!updatedBook.name || !updatedBook.start_lang || !updatedBook.end_lang || !updatedBook.ownerEmail) {
			return next(new Error('Missing required fields'));  
		}
		const result = await bookService.updateOne({ short_id: id }, updatedBook);
		if (!result) {
			return next(new Error('Book not found')); 
		}
		res.status(200).json(result);
	})
);

module.exports = { bookRouter };
