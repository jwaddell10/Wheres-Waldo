const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Puzzle = require("../models/puzzle.js");
const uploadToCloudinary = require('../services/cloudinary.js');

// imageController.js

exports.clickPost = async (req, res, next) => {
    try {
        const uploadedImages = await uploadToCloudinary();
        const publicIds = uploadedImages.map((image => image.public_id))
        console.log(publicIds, 'this is ids')
        console.log(req.params.imageId, 'this is reqid')
        const result = uploadedImages.filter((image) => !image.asset_id.includes(req.params.imageId))
        res.json({ success: true, images: uploadedImages });
    } catch (error) {
        console.error('Error in puzzle controller:', error);
        next(error);
    }
};
