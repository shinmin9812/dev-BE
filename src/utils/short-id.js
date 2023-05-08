const { nanoid } = require("nanoid");

/** nanoid 라는 npm 패키지를 설치하여 document들의 고유 번호를 부여합니다 
 * 
 *  참고 : uuid, nanoid, autoIncrement
 *  
*/
const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  require: true,
  index: true,
};

module.exports = { shortId };
