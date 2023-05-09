const { Router } = require("express");
const { wordDAO } = require("../db/dao/word-dao");
//bookDAO를 짜신후에 변경, 사용하시면 되겠습니다
const bookRouter = Router();

bookRouter.get('/', (req, res) => {
  res.json(`책 페이지에 온걸 환영해용`)
})

bookRouter.post('/', async (req, res) => {
  console.log(req.body);
  const 결과 = await wordDAO.create(req.body);
  console.log(결과);
  res.json(`잘왔어용`);
})

// bookRouter.delete()

module.exports = { bookRouter };
