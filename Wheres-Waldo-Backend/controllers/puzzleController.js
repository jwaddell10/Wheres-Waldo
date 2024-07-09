const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Puzzle = require("../models/puzzle.js");

exports.clickPost = asyncHandler(async (req, res, next) => {
	console.log('click post is running')
    console.log(req, 'this is req')
});