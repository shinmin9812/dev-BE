const axios = require('axios');
const cheerio = require('cheerio');

//wordMeaningService
class MeaningService {
	async getWordMeanings(lang, word) {
		if (!lang) {
			const error = new Error('언어가 입력되지 않았습니다.');
			error.status = 400;
			throw error;
		}

		if (!['en', 'ko'].includes(lang)) {
			const error = new Error('올바르지 않은 언어입니다.');
			error.status = 400;
			throw error;
		}

		if (lang === 'en') {
			const response = await axios.get(
				`https://dic.daum.net/search.do?q=${word}`,
			);

			const html = response.data;
			const $ = cheerio.load(html);

			// 검색 결과에서 단어 뜻 부분 추출
			const meanings = $('.cleanword_type.kuek_type > .list_search > li')
				.map((index, element) => {
					// 뜻 내용
					const desc = $(element).find('.txt_search').text().trim();
					return `${desc}`;
				})
				.get();

			if (meanings.length === 0) {
				const error = new Error('해당 단어의 뜻을 찾을 수 없습니다.');
				error.status = 204;
				throw error;
			}

			return meanings;
		}
		if (lang == 'ko') {
			const response = await axios.get(
				`https://dic.daum.net/search.do?q=${word}&dic=eng&search_first=Y`,
			);
			const html = response.data;
			const $ = cheerio.load(html);

			// 검색 결과에서 단어 뜻 부분 추출
			const meanings = $('.cleanword_type.kuke_type > .list_search > li')
				.map((index, element) => {
					// 뜻 내용
					const desc = $(element).find('.txt_search').text().trim();
					return `${desc}`;
				})
				.get();

			if (meanings.length === 0) {
				const error = new Error('해당 단어의 뜻을 찾을 수 없습니다.');
				error.status = 204;
				throw error;
			}

			return meanings;
		}
	}
}

const meaningService = new MeaningService();
module.exports = { meaningService };
