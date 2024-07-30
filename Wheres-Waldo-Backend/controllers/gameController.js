const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Puzzle = require("../models/puzzle.js");
const Character = require("../models/character.js");
const uploadToCloudinary = require("../services/cloudinary.js");
const cloudinary = require("cloudinary");

let gameStartTime = null;

exports.startGame = asyncHandler(async (req, res, next) => {
	gameStartTime = Date.now();
});

exports.endGame = asyncHandler(async (req, res, next) => {
	const endTime = Date.now();
	const duration = endTime - gameStartTime
	const seconds = duration / 1000;
	next();
});
