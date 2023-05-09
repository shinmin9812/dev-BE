const { Router } = require("express");
const { wordService, bookService, bookCaseService } = require("../services/word-service");
const { asyncHandler, errorHandler } = require("../middlewares")
const wordRouter = Router();

// Get all words
wordRouter.get('/', asyncHandler(async (req, res) => {
  const result = await wordService.findAll();
  res.json(result);
}));

// Get a word by ID
wordRouter.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await wordService.findOneById({ short_id: id });
  res.json(result);
}));

// Create a new word
wordRouter.post('/', asyncHandler(async (req, res) => {
  const newWord = req.body.word;
  /**word form 안에 사용자가 
   * english, korean, pronounce, description 을 담아보내야합니다. */
  const result = await wordService.createOne(newWord);
  res.json(result);
}));

// Delete a word by ID
wordRouter.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await wordService.deleteOne({ short_id: id });
  res.json('삭제 성공');
}));

// Get a word to edit
wordRouter.get('/edit/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await wordService.findOne({ short_id: id });
  res.json(result);
}));

// Update a word by ID
wordRouter.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedWord = req.body.word;
  const result = await wordService.updateOne({ short_id: id }, updatedWord);
  res.json(result);
}));

// Error handling middleware
wordRouter.use(errorHandler);

module.exports = { wordRouter };
