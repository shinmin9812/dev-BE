const { wordService } = require('../services/word-service');
const { meaningService } = require('../services/meaning-service');

async function addSampleWords(req, userEmail, bookId, res) {
	if (Array.isArray(req.body)) {
		const newWordsArray = req.body;
		const promises = newWordsArray.map(async (word, index) => {
			return new Promise((resolve, reject) => {
				setTimeout(async () => {
					try {
						const meanings = await meaningService.getWordMeanings(
							word.lang,
							word.word,
						);
						word.ownerEmail = userEmail;
						word.bookId = bookId;
						word.meanings = meanings;
						resolve(word);
					} catch (err) {
						console.log(
							`Error occurred while fetching the meanings for ${word.word}: ${err.message}`,
						);
						resolve(null);
					}
				}, index * 500); // 각 요청 사이의 지연 시간을 인덱스 값에 따라 설정
			});
		});
		Promise.all(promises)
			.then(results => {
				const filteredWords = results.filter(word => word !== null);
				return wordService.createMany(filteredWords);
			})
			.then(result => {
				// res.status(200).json(result);
			})
			.catch(err => {
				console.log(`Error occurred: ${err.message}`);
				res.status(500).json({ message: 'Internal server error' });
			});
	} else {
		/**하나만 생성하려한다면 */
		const { lang, word } = req.body;
		const meanings = await meaningService.getWordMeanings(lang, word);
		const newWord = req.body;
		newWord.ownerEmail = userEmail;
		newWord.meanings = meanings;
		const result = await wordService.createOne(newWord);
		res.status(200).json(result);
	}
}

exports.addSampleWords = addSampleWords;
