const asyncHandler = require("express-async-handler")
const User = require("../models/user.js")

exports.addUser = asyncHandler(async (req, res, next) => {
    const user = await User.find({name: req.body.formDataObj.user})

    if (!user) {
        const createdUser = new User({
            name: req.body.formDataObj.user,
            
        })
    }
})