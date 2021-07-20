const mongoose = require('mongoose');

module.exports.init = async () => {
	try {
		const database = await mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log('Connected to database');
		return database;
	} catch (e) {
		console.log('Fail to connect database. ' + e.message);
	}
};
