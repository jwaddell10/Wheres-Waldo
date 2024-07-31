const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
	puzzle: {
		type: Schema.Types.ObjectId,
		ref: "Puzzle",
		required: true,
	}
});

module.exports = mongoose.model("User", userSchema);
