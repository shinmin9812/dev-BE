const { Router } = require('express');
const { bookService } = require('../services/book-service');
const { asyncHandler } = require('../middlewares/async-handler');

const bookRouter = Router();

bookRouter.get('/', 
	asyncHandler(async (req, res) => {
		console.log("router")
		const result = await bookService.findAll();
		res.json(result);
	})
);

bookRouter.get('/:id', 
  asyncHandler(async (req, res) => {
		const { id } = req.params;
		const result = await bookService.findOneById({ short_id: id });
		res.json(result);
	})
);

bookRouter.post('/', 
  asyncHandler(async (req, res) => {
		const newBook = req.body;  // 포스트맨 바디가 여기 담겨온다
		console.log(newBook);
		const result = await bookService.createOne(newBook);
		res.json(result);
	})
);

bookRouter.delete('/:id', 
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const result = await bookService.deleteOne({ short_id: id });
		res.json(result);
	})
);

bookRouter.put('/short-id/:id', 
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const updatedBook = req.body;
		const result = await bookService.updateOne({ short_id: id }, updatedBook);
		res.json(result);
	})
);

bookRouter.put('/name/:currName', 
	asyncHandler(async (req, res) => {
		const { currName } = req.params;
		console.log(currName);
		const updatedBook = req.body;
		const result = await bookService.updateOne({ name: currName }, updatedBook, {
			new: true,
		});
		res.json(result);
	})
);

module.exports = { bookRouter };
