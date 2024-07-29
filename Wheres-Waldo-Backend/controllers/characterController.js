const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Character = require("../models/character.js");

exports.charactersGet = asyncHandler(async (req, res, next) => {
	try {
		// console.log(req.params.imageId, 'this is req')
		const characters = await Character.find({ puzzle: req.params.imageId});
		console.log(characters, 'this is characters')
		res.json({ characters })
	} catch (error) {
		next(error);
	}
});
