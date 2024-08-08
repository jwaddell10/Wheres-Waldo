const asyncHandler = require("express-async-handler");
const Character = require("../models/character.js");

exports.charactersGet = asyncHandler(async (req, res, next) => {
	try {
		const characters = await Character.find({ puzzle: req.params.imageId});
		res.json({ characters })
	} catch (error) {
		next(error);
	}
});
