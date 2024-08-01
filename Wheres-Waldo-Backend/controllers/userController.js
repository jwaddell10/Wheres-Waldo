const asyncHandler = require("express-async-handler")
const User = require("../models/user.js")

exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.json(users)
})