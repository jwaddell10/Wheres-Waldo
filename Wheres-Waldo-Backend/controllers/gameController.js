const asyncHandler = require("express-async-handler");
const Puzzle = require("../models/puzzle.js");
const User = require("../models/user.js");

let gameStartTime = null;
let endTime = null;
let seconds = null;

exports.startGame = asyncHandler(async (req, res, next) => {
	gameStartTime = req.requestTime;
	return gameStartTime;
});

exports.endGame = asyncHandler(async (req, res, next) => {
	endTime = req.requestTime;
	const duration = endTime - gameStartTime;
	seconds = duration / 1000;
	res.json(seconds)
});

exports.addUser = asyncHandler(async (req, res, next) => {
	const puzzle = await Puzzle.findById(req.params.imageId);

	const createdUser = new User({
		name: req.body.formDataObj.user,
		time: seconds,
		puzzle: puzzle,
	});
console.log(createdUser, 'createdueser')
	// await createdUser.save();
	res.json(createdUser)
});
