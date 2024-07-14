const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Puzzle = require("../models/puzzle.js");
const Character = require("../models/character.js")
const uploadToCloudinary = require("../services/cloudinary.js");
const cloudinary = require("cloudinary");

// imageController.js

exports.clickPost = async (req, res, next) => {
	try {
        console.log(req.body, 'this is req body')
        //get image, get characters, get coordinates
        const characters = req.body.characters
        const x = () => {
			
		}
        const y = req.body.coordinates.y
		const image = await cloudinary.v2.search
			.expression("resource_type:image")
			.sort_by("public_id", "desc")
			.max_results(30)
			.execute()
			.then((result) =>
				result.resources
					.map((item) => item.asset_id)
					.filter((assetId) => assetId === req.body.assetId)
			);
        const match = await Character.findOne({ coordinates: [x, y] })
        console.log(match, 'this is match')
        

	} catch (error) {
		console.error("Error in puzzle controller:", error);
		next(error);
	}
};
