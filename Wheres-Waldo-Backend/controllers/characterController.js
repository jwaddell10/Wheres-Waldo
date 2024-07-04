const asyncHandler = require('express-async-handler')
const { body, validationResult} = require('express-validator')
const Character = require('../models/character.js')

exports.userClickPost