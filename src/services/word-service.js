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

		//중복되는 랜덤 값을 피해서 배열에 저장
		function getRandomIndex(maxIndex, excludeIndexes = []) {
			let randomIndex;
			do {
				randomIndex = Math.floor(Math.random() * maxIndex);
			} while (excludeIndexes.includes(randomIndex));
			return randomIndex;
		}

		//정답을 랜덤하게 선택하기 위해 배열에 인덱스 값 넣기
		for (let i = 0; i < number; i++) {
			const randomAnswerIndex = getRandomIndex(len, randomAnswersIndex);
			randomAnswersIndex.push(randomAnswerIndex);
			answersArray.push(words[randomAnswerIndex]);
		}

		//보기를 랜덤하게 선택하기 위해 배열에 인덱스 값 넣기
		//조건 1. 보기끼리 인덱스 겹치지 않기, 2. 정답 인덱스와 겹치지 않기
		for (let i = 0; i < number; i++) {
			const temp = [];
			const usedIndexes = [randomAnswersIndex[i]];
			while (temp.length < 3) {
				const randomIndex = getRandomIndex(len, usedIndexes);
				temp.push(words[randomIndex]);
				usedIndexes.push(randomIndex);
			}
			selectionsArray.push(temp);
		}

		//퀴즈 리스트에 {answer, selections} 형태로 삽입
		const quizlist = answersArray.map(
			({ short_id, word, meanings, status }, index) => {
				const currentSelections = selectionsArray[index];
				const selections = currentSelections.map(
					({ short_id, word, meanings }) => ({
						short_id,
						word,
						meanings,
					}),
				);

				return {
					answer: { short_id, word, meanings, status },
					selections,
				};
			},
		);

		return quizlist;
	}

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
