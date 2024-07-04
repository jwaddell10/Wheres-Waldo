const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
	completed: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
