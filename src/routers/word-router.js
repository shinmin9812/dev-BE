const { Router } = require("express");
const { WordModel, BookModel, BookCaseModel } = require("../db/schemas/word-schema");
const { wordDTO, bookDTO, bookCaseDTO } = require("../db/dto/word-dto");
const wordRouter = Router();

wordRouter.get('/', async (req, res) => {
  const result = await wordDTO.findAll();
  res.json(result);
})

wordRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await wordDTO.findOneById({ short_id: id });
  res.json(result);
})

wordRouter.post('/', async (req, res) => {
  const { english, korean, pronounce, description } = req.body.word;
  /**word form 안에 사용자가 
   * english, korean, pronounce, description 을 담아보내야합니다. */
  const result = await wordDTO.createOne({ english, korean, pronounce, description });
  res.json(result);
})

wordRouter.delete('/:id', async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const result = await wordDTO.deleteOne({ short_id: id });
  console.log(result);
  res.json('success');
})

wordRouter.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const result = await wordDTO.findOne({ short_id: id })
    ({ short_id: id });
  res.json(result);
})

wordRouter.put('/:id', async (req, res) => {
  console.log(req.params, req.body)
  const { id } = req.params;
  const { english, korean, pronounce, description } = req.body.word;
  const result = await wordDTO.updateOne({ short_id: id }, { english, korean, pronounce, description });
  res.json(result);
})

module.exports = { wordRouter };
