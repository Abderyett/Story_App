const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	googleId: { type: String, require: true },
	facebookId: { type: String },
	displayName: { type: String, require: true },
	givenName: { type: String, require: true },
	lastName: { type: String, require: true },
	image: { type: String },
	email: { type: String },
	created_At: { type: Date, default: Date.now, require: true },
});

mongoose.model("User", userSchema);
