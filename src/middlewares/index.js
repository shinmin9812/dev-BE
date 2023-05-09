const asyncHandler = require('./async-handler');
const errorHandler = require('./error-handler');

module.exports = { asyncHandler, errorHandler };

/**
 * asyncHandler는 Express.js 애플리케이션에서 에러 핸들링을 간단하게 해주는 
 * 미들웨어 함수입니다. 일반적으로 Express.js에서 비동기 함수 내에서
 *  발생한 에러를 처리하는 방법은 try-catch 문을 사용하는 것입니다. 
 * 그러나 asyncHandler를 사용하면 비동기 함수 내에서 에러가 발생하더라도 
 * 미들웨어 스택을 통과하면서 에러 처리를 수행할 수 있습니다.
 * 
 * 
 * body-parser 는 Express.js 애플리케이션에서 
 * 요청 본문(request body)을 파싱하여 사용할 수 있는 형태로 
 * 만들어주는 미들웨어 함수입니다. 요청이 들어오면 body-parser는 
 * 요청 본문을 파싱하여 req.body 객체에 저장합니다. 
 * 이를 통해 클라이언트에서 보낸 데이터를 쉽게 읽고 사용할 수 있습니다. 
 * application/x-www-form-urlencoded, application/json, multipart/form-data 등 
 * 다양한 형식의 요청 본문을 파싱할 수 있습니다. 
 * */
