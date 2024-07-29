const express = require("express");
const puzzle = require("../models/puzzle");
const router = express.Router();
const gameController = require("../controllers/gameController");
const characterController = require("../controllers/characterController")
/* GET home page. */
// router.get("/", function (req, res, next) {
// 	res.render("index", { title: "Express" });
// });

router.get("/image/:imageId", characterController.charactersGet)
// router.post("/image/:imageId", gameController.game)
// router.post("/image/:imageId", gameController.clickPost)

// router.get("/image/:imageId", gameController.startGame)

module.exports = router; 
