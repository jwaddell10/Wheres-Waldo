const express = require("express");
const puzzle = require("../models/puzzle");
const router = express.Router();
const puzzleController = require("../controllers/puzzleController");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/image/:imageId", puzzleController.clickPost)

module.exports = router;
