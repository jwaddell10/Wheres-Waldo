const express = require("express");
const puzzle = require("../models/puzzle");
const router = express.Router();
const puzzleController = require("../controllers/puzzleController");
const characterController = require("../controllers/characterController")
/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/image/:imageId", characterController.charactersGet)

router.post("/image/:imageId", puzzleController.clickPost)

module.exports = router;
