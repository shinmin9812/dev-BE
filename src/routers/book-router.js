const { Router } = require("express");
const { bookService } = require("../services/word-service");
const bookRouter = Router();


bookRouter.get('/', async (req, res) => {
  const result = await bookService.findAll();
  res.json(result);
})

bookRouter.get('/:id', async (req, res) => {
  console.log(req.params.id)
  const { id } = req.params;
  const result = await bookService.findOneById({ short_id: id });
  res.json(result);
})

bookRouter.post('/', async (req, res) => {
  const newBook = req.body.book;
  console.log(newWord)
  /**word form 안에 사용자가 
   * english, korean, pronounce, description 을 담아보내야합니다. */
  const result = await bookService.createOne(newWord);
  console.log(result)
  res.json(result);
})

bookRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await bookService.deleteOne({ short_id: id });
  console.log(result);
  res.json('삭제 성공');
})

bookRouter.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const result = await bookService.findOne({ short_id: id });
  res.json(result);
})

bookRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body.book;
  const result = await bookService.updateOne({ short_id: id }, updatedWord);
  res.json(result);
})

module.exports = { bookRouter };
