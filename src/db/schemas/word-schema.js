const { model, Schema } = require('mongoose');
const { shortId } = require('../../utils/short-id');

/** 단어 스키마 */
const WordSchema = new Schema(
	{
		short_id: shortId,
		english: { type: String, required: true },
		korean: { type: String, required: true },
		pronounce: { type: String },
		description: { type: String },
		/**book: [BookSchema] 코드는 WordSchema의 book 필드가 
		 * BookSchema 모델에 대한 배열임을 나타냅니다. 
		 * 이 코드는 Book 모델에 대한 참조를 생성하지 않습니다. 
		 * 대신, BookSchema가 이미 정의되어 있으므로 Book 모델을
		 * 따로 만들 필요 없이 book 필드가 BookSchema 모델을 
		 * 사용한다는 것을 나타내기만 하면 됩니다. 
		 * 따라서 이 코드는 Word 컬렉션 내에서 각각의 
		 * 단어가 속한 단어장을 참조하기 위해 BookSchema 모델을 
		 * 사용합니다. 이 방식은 NoSQL 데이터베이스인 MongoDB에서 
		 * 일반적으로 사용되는 방식 중 하나입니다. 
		 * 이렇게 하면 각 단어 객체가 저장될 때 해당 단어장을 
		 * 포함하여 저장할 수 있으므로, 단어장에 속한 단어를 검색하거나 
		 * 단어장에 있는 모든 단어를 가져오는 등의 작업이 더욱 효율적으로
		 * 수행됩니다. */
	},
	{
		collection: 'Word',
		timestamps: true,
	},
);

/** 단어장 스키마 */
const BookSchema = new Schema(
	{
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
		},
	},
	{
		collection: 'Book',
		timestamps: true,
	},
);

/** 책장 스키마 */
const BookCaseSchema = new Schema(
	{
		name: {
			type: [BookSchema],
			required: false,
		},
	},
	{
		collection: 'BookCase',
		timestamps: true,
	},
);

/** 단어, 단어장, 책장 모델 선언
 *  새로운 document를 생성하려 하면,
 *  아래 모델 클래스의 인스턴스로서 새로운 모델(mongoDB document)들이 생성되어
 *  db에 입력됩니다.
 */
const WordModel = model('Word', WordSchema);
const BookModel = model('Book', BookSchema);
const BookCaseModel = model('BookCase', BookCaseSchema);

module.exports = { WordModel, BookModel, BookCaseModel };
