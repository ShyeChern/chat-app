const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId,
	},
	username: {
		type: String,
	},
});

module.exports = mongoose.model('User', userSchema);
