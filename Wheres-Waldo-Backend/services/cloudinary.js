// cloudinaryUploader.js
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const Puzzle = require('../models/puzzle')

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const images = [
    "../wheres-waldo-frontend/src/assets/waldoBeach.jpg",
    "../wheres-waldo-frontend/src/assets/waldoDowntown.jpg",
    "../wheres-waldo-frontend/src/assets/waldoFactory.jpg",
];

const uploadToCloudinary = async () => {
    const uploadedImages = [];
    for (const image of images) {
        try {

            //get specific image, get characters on image
            const result = await cloudinary.uploader.upload(image);
            uploadedImages.push(result);

            const waldoBeach = uploadedImages[0]
            waldoBeach.name = "Waldo Beach"
            
        } catch (error) {
            console.error(`Error uploading ${image}:`, error);
        }
    }
    return uploadedImages;
};

// module.exports = uploadToCloudinary;