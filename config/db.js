const mongoose = require("mongoose");

const mongoDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`connected successfully to DB ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = mongoDB;
