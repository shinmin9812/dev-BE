const { Schema, model } = require('mongoose');
const { shortId } = require('../../utils/short-id');

/** 퀴즈 스키마 */
const QuizSchema = new Schema(
	{
		short_id: shortId,
		category: {
			type: String,
			required: true,
		},
		ownerEmail: {
			type: String,
			required: true,
		},
		correctWords: [
			{
				type: String,
				required: true,
			},
		],
		incorrectWords: [
			{
				type: String,
				required: true,
			},
		],
	},
	{
		collection: 'Quiz',
		timestamps: true,
	},
);

const QuizModel = model('Quiz', QuizSchema);

module.exports = { QuizModel };
