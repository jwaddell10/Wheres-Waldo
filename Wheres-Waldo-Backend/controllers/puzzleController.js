const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Puzzle = require("../models/puzzle.js");
const uploadToCloudinary = require("../services/cloudinary.js");
const cloudinary = require("cloudinary");

// imageController.js

exports.clickPost = async (req, res, next) => {
	try {
		// https://api.cloudinary.com/v1_1/:cloud_name/:action

        //get image, get characters, get coordinates
        console.log(req.body, 'this is reqbody')
        const characters = req.body.characters

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

        

	} catch (error) {
		console.error("Error in puzzle controller:", error);
		next(error);
	}
};
