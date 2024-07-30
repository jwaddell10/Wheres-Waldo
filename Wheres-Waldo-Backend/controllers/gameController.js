const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Puzzle = require("../models/puzzle.js");
const Character = require("../models/character.js");
const uploadToCloudinary = require("../services/cloudinary.js");
const cloudinary = require("cloudinary");

// imageController.js

//gamecontroller
//start game
//play game
//end game

// const timer = () => {

// }

exports.game = asyncHandler(async (req, res, next) => {
	//initialize timer

	function counter() {
		let count = 0;
		setInterval(() => {
			count++;
			// console.log(count, 'this is count')
		}, 1);
	}
	counter();
});

//get characters, get coordinates, get puzzle
// const characters = await Character.find({ puzzle: req.params.imageId})
// const characterCoordinates = characters.map((item) => ({coordinates: item.coordinates, name: item.name}))

// exports.clickPost = asyncHandler(async (req, res, next) => {
// 	try {
// 		// //start timer, if 3 circles are sent back end game
// 		// testFunction();
// 		const character = await Character.find({
// 			name: req.body.selectedCharacter,
// 			puzzle: req.body.imageId,
// 		});
// 		const characterCoordinates = character[0].coordinates;
// 		const characterX = characterCoordinates[0];
// 		const characterY = characterCoordinates[1];
// 		const x = req.body.coordinates.x;
// 		const y = req.body.coordinates.y;
// 		const bottomLeft = [x - 4, y - 4];
// 		const bottomLeftX = bottomLeft[0];
// 		const bottomLeftY = bottomLeft[1];
// 		const topRight = [x + 4, y + 4];
// 		const topRightX = topRight[0];
// 		const topRightY = topRight[1];

// 		function checkTarget(
// 			characterX,
// 			characterY,
// 			bottomLeftX,
// 			bottomLeftY,
// 			topRightX,
// 			topRightY
// 		) {
// 			if (
// 				characterX >= bottomLeftX &&
// 				characterX <= topRightX &&
// 				characterY >= bottomLeftY &&
// 				characterY <= topRightY
// 			) {
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		}
// 		const match = checkTarget(
// 			characterX,
// 			characterY,
// 			bottomLeftX,
// 			bottomLeftY,
// 			topRightX,
// 			topRightY
// 		);
// 		console.log(match, 'this is match')
// 		if (match === true) {
// 			res.json({ character });
// 		}
// 	} catch (error) {
// 		console.error("Error in puzzle controller:", error);
// 		next(error);
// 	}
// });
