const express = require("express");
const router = express.Router();
const puzzleController = "../controllers/puzzleController.js";

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/image/:imageId", function (req, res) {
	console.log('is this running?')
});

module.exports = router;
