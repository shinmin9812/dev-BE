const { Router } = require("express");
const { WordModel, BookModel, BookCaseModel } = require("../db/schemas/word-schema");
const { WordDTO, BookDTO, BookCaseDTO } = require("../db/dto/word-dto");
const wordRouter = Router();

wordRouter.get('/', async (req, res) => {
  const result = await WordModel.find({});
  res.json(result);
})

wordRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await WordModel.find({ short_id: id });
  res.json(result);
})

wordRouter.post('/', async (req, res) => {
  const { english, korean, pronounce, description } = req.body.word;
  /**word form 안에 사용자가 
   * english, korean, pronounce, description 을 담아보내야합니다. */
  const result = await WordModel.create({ english, korean, pronounce, description });
  res.json(result);
})

{
  "name": "은결님의단어장",
    "description": "와 쉽다~",
      // "start_lang": "english",
      //   "end_lang": "korean"
}
short_id: shortId,
  name: { type: String, required: true },
words: [WordSchema],
  description: { type: String },
start_lang: {
  type: String,
  enum: ['english', 'korean'],
  default: 'english',
    required: true,
},
end_lang: {
  type: String,
  enum: ['english', 'korean'],
  default: 'korean',
    required: true,




      wordRouter.delete('/:id', async (req, res) => {
        console.log(req.params);
        const { id } = req.params;
        const result = await WordModel.findOneAndDelete({ short_id: id });
        console.log(result)
        res.json('success');
      })

  wordRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { english, korean, pronounce, description } = req.body.word;
    const result = await WordModel.findOneAndUpdate({ short_id: id }, { english, korean, pronounce, description });
    res.json(result);
  })

  module.exports = { wordRouter };