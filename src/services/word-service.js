const { wordDAO } = require('../db/dao/word-dao');
const { BookModel } = require('../db/schemas/book-schema');

class WordService {
	async findWordsByBook(userEmail, book) {
		console.log(book);
		const words = await wordDAO.findWordsByBook(userEmail, book);
		if (!words) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async findOneById(clue) {
		const word = await wordDAO.findOneById(clue);
		if (!word) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return word;
	}

	async findSampleWords() {
		const sampleBook = await BookModel.findOne({
			name: '샘플단어장',
		});
		const words = await wordDAO.findSampleWords(sampleBook.short_id);
		if (!words) {
			const err = new Error('단어를 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async findAllWordsOfThisUser(userEmail) {
		const words = await wordDAO.findAll(userEmail);
		if (!words) {
			const err = new Error('단어들을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	async findWordsByStatus(userEmail, status) {
		const words = await wordDAO.findAll(userEmail, status);
		if (!words) {
			const err = new Error('단어들을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}
		return words;
	}

	//민석 시작======================================
	async findWordsByBookAndStatus(userEmail, statuses, bookIds, number) {
		const randomAnswersIndex = [];
		const answersArray = [];
		const selectionsArray = [];

		const words = await wordDAO.findWordsByBookAndStatus(
			userEmail,
			statuses,
			bookIds,
		);
		/** words를 반환하지 못하면 에러 */
		if (!words) {
			const err = new Error('단어들을 찾을 수 없습니다.');
			err.status = 404;
			throw err;
		}

		const len = words.length;
		if (number > len) number = len;

		//랜덤 숫자가 배열에 있는지 indexOf로 확인,
		//-1이면 없으므로 배열에 삽입, 그렇지 않으면 i 감소 후 다시 랜덤 숫자 뽑음
		for (let i = 0; i < number; i++) {
			const randomNum = Math.floor(Math.random() * len);
			if (randomAnswersIndex.indexOf(randomNum) === -1) {
				randomAnswersIndex.push(randomNum);
			} else {
				i--;
			}
		}

		//정답 단어 랜덤으로 선택
		for (let i = 0; i < randomAnswersIndex.length; i++) {
			answersArray[i] = words[randomAnswersIndex[i]];
		}

		//보기 단어들 랜덤으로 선택
		for (let i = 0; i < number; i++) {
			const startIndex = i * 3;
			const endIndex = startIndex + 3;
			const randomWords = words.slice(startIndex, endIndex);
			selectionsArray.push(randomWords);
		}

		//퀴즈 리스트에 {answer, selections} 형태로 삽입
		const quizlist = answersArray.map((object, index) => {
			const answer = object._doc;
			const selections = selectionsArray[index];

			return {
				answer,
				selections,
			};
		});

		return quizlist;
	}
	//민석 종료======================================

	async createOne(params) {
		/** 없는 단어장을 기재하여 추가하려한다면 에러 반환 */
		const existingBook = await BookModel.find({
			bookId: params.book,
			ownerEmail: params.ownerEmail,
		});
		if (!existingBook) {
			const err = new Error('해당 단어장이 존재하지 않습니다.');
			err.status = 422;
			throw err;
		}
		const word = await wordDAO.createOne(params);
		/** 잘못된 요청을 받았다면 */
		if (!word) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return word;
	}

	async createMany(params) {
		/** 없는 단어장을 기재하여 추가하려한다면 에러 반환 */
		params.forEach(async word => {
			const existingBook = await BookModel.find({
				name: word.book,
				ownerEmail: word.ownerEmail,
			});
			//추후 bookDAO 나 BookService로 수정 필요
			if (!existingBook) {
				const err = new Error('해당 단어장이 존재하지 않습니다.');
				err.status = 422;
				throw err;
			}
		});
		const words = await wordDAO.createMany(params);
		/** 잘못된 요청을 받았다면 */
		if (!words) {
			const err = new Error('새로운 단어를 추가하지 못했습니다.');
			err.status = 422;
			throw err;
		}
		return words;
	}

	async updateOne(clue, update) {
		/** 수정할 단어의 전체 정보 */
		const currWord = await wordDAO.findOneById(clue);
		if (!currWord) {
			const err = new Error('해당 단어를 찾을 수 없어 수정에 실패하였습니다.');
			err.status = 404;
			throw err;
		}
		/** 해당 유저가 가진 단어장이 맞는지 */
		//추후 bookDAO 나 BookService로 수정
		const thisBook = await BookModel.findOne({
			ownerEmail: currWord.ownerEmail,
			short_id: currWord.bookId,
		});
		/** 없는 단어장을 기재하여 추가하려한다면 */
		if (!thisBook) {
			const err = new Error('해당 단어장이 존재하지 않습니다.');
			err.status = 422;
			throw err;
		}
		/** 잘못된 요청을 받았다면 */
		if (currWord.ownerEmail === clue.ownerEmail) {
			const newWord = await wordDAO.updateOne(clue, update);
			if (!newWord) {
				const err = new Error('단어를 수정하지 못했습니다.');
				err.status = 422;
				throw err;
			}
			return newWord;
		}
	}

	async findWordsAndUpdate(clue, updateObj) {
		/** 수정할 단어의 ownerEmail과 clue의 ownerEmail이 동일한지 검증 */
		const currWord = await wordDAO.findOneById(clue);
		if (currWord.ownerEmail === clue.ownerEmail) {
			const word = await wordDAO.findWordsAndUpdate(clue, updateObj);
			if (!word) {
				const err = new Error('암기상태를 수정하지 못했습니다.');
				err.status = 500;
				throw err;
			}
			return word;
		}
	}

	async deleteOne(clue) {
		/** 삭제할 단어의 ownerEmail과 clue의 ownerEmail이 동일한지 검증 */
		const currWord = await wordDAO.findOneById(clue);
		if (currWord.ownerEmail === clue.ownerEmail) {
			const word = await wordDAO.deleteOne(clue);
			if (!word) {
				const err = new Error('단어를 삭제하지 못했습니다.');
				err.status = 500;
				throw err;
			}
			return word;
		}
	}

	async deleteAll() {
		/** 삭제할 단어의 ownerEmail과 clue의 ownerEmail이 동일한지 검증 */
		const currWord = await wordDAO.findOneById(clue);
		if (currWord.ownerEmail === clue.ownerEmail) {
			const words = await wordDAO.deleteAll({});
			if (!words) {
				const err = new Error('단어를 삭제하지 못했습니다.');
				err.status = 500;
				throw err;
			}
			return words;
		}
	}
}

const wordService = new WordService();
module.exports = { wordService };
