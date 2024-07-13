const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	puzzle: {
		type: Schema.Types.ObjectId,
		ref: "Puzzle",
		required: true,
		// coordinates: {
		// 	x: {
		// 		type: Number,
		// 		required: true,
		// 	},
		// 	y: {
		// 		type: Number,
		// 		required: true,
		// 	},
		// },
	},
    coordinates: {
        type: [Number],
        required: true,
    }
});

module.exports = mongoose.model("Character", characterSchema);
