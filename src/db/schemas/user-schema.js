const { Schema, model } = require('mongoose');
const { shortId } = require('../../utils/short-id');

const UserSchema = new Schema(
	{
		userId: shortId,
		userEmail: {
			type: String,
			required: true,
			unique: true,
		},
		nickname: { type: String, required: true },
		password: {
			type: String,
			required: true,
			minLength: 8,
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			required: false,
			default: 'user',
		},
	},
	{
		collection: 'User',
		timestamps: true,
	},
);

const UserModel = model('User', UserSchema);

module.exports = { UserModel };
