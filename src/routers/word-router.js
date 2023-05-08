const { Router } = require("express");
// const { WordModel, BookModel, BookCaseModel } = require("../db/schemas/word-schema");
// const { wordDTO, bookDTO, bookCaseDTO } = require("../db/dto/word-dto");
const { wordService, bookService, bookCaseService } = require("../services/word-service");
const wordRouter = Router();

wordRouter.get('/', async (req, res) => {
  const result = await wordService.findAll();
  res.json(result);
})

wordRouter.get('/:id', async (req, res) => {
  console.log(req.params.id)
  const { id } = req.params;
  const result = await wordService.findOneById({ short_id: id });
  res.json(result);
})

wordRouter.post('/', async (req, res) => {
  const newWord = req.body.word;
  console.log(newWord)
  /**word form 안에 사용자가 
   * english, korean, pronounce, description 을 담아보내야합니다. */
  const result = await wordService.createOne(newWord);
  console.log(result)
  res.json(result);
})

wordRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await wordService.deleteOne({ short_id: id });
  console.log(result);
  res.json('삭제 성공');
})

wordRouter.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const result = await wordService.findOne({ short_id: id });
  res.json(result);
})

wordRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedWord = req.body.word;
  const result = await wordService.updateOne({ short_id: id }, updatedWord);
  res.json(result);
})

module.exports = { wordRouter };
