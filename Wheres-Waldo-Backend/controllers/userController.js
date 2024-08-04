const asyncHandler = require("express-async-handler")
const User = require("../models/user.js")

exports.getUsers = asyncHandler(async (req, res, next) => {
    const puzzle = req.params.imageId
    const users = await User.find({ puzzle: puzzle });
    console.log(users, 'this is users')

    res.json(users)
})