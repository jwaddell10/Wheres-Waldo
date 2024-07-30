const asyncHandler = require("express-async-handler")
const User = require("../models/user.js")

//once user clicks 'click me' the game starts
//timer starts
//method for when game ends, timer stops and user can submit their name

const startTimer = () => {
    //have a counter, send that counter as a timer to the frontend
    //need current date
    //setinterval to update the date every X amount of time
    //get the current date in setInterval function, then compare to old date every X amount of time
}

exports.addUser = asyncHandler(async (req, res, next) => {
    console.log(req.body.formDataObj, 'this is req')
    const user = await User.find({name: req.body.formDataObj.user})
    console.log(user, 'this is user')
})