const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	messages: [
		{
			message: {
				type: String,
			},
			senderId: {
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
			time: {
				type: Date,
				default: new Date(),
			},
		},
	],
});

module.exports = mongoose.model('Chat', chatSchema);
