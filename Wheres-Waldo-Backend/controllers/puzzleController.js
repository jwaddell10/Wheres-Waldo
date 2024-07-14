const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Puzzle = require("../models/puzzle.js");
const Character = require("../models/character.js");
const uploadToCloudinary = require("../services/cloudinary.js");
const cloudinary = require("cloudinary");

// imageController.js

exports.clickPost = async (req, res, next) => {
	try {
		console.log(req.body, "this is req body");
		//get image, get characters, get coordinates
		// const characters = req.body.selectedCharacter;
		const character = await Character.find({
			name: req.body.selectedCharacter,
			puzzle: req.body.imageId,
		});
		const characterCoordinates = character[0].coordinates;
		const characterX = characterCoordinates[0];
		const characterY = characterCoordinates[1];
		const x = req.body.coordinates.x;
		const y = req.body.coordinates.y;
		const bottomLeft = [x - 25, y - 25];
		const bottomLeftX = bottomLeft[0];
		const bottomLeftY = bottomLeft[1];
		const topRight = [x + 25, y + 25];
		const topRightX = topRight[0];
		const topRightY = topRight[1];

		function withinBounds(
			characterX,
			characterY,
			bottomLeftX,
			bottomLeftY,
			topRightX,
			topRightY
		) {
			if (
				characterX >= bottomLeftX &&
				characterX <= topRightX &&
				characterY >= bottomLeftY &&
				characterY <= topRightY
			) {
				return true;
			} else {
				return false;
			}
		}
		const match = withinBounds(
			characterX,
			characterY,
			bottomLeftX,
			bottomLeftY,
			topRightX,
			topRightY
		);
		if (match === true) {
			res.json({ character });
		}
	} catch (error) {
		console.error("Error in puzzle controller:", error);
		next(error);
	}
};
