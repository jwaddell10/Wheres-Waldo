const express = require("express");
const puzzle = require("../models/puzzle");
const router = express.Router();
const gameController = require("../controllers/gameController");
const characterController = require("../controllers/characterController");
const userController = require("../controllers/userController");
/* GET home page. */
// router.get("/", function (req, res, next) {
// 	res.render("index", { title: "Express" });
// });

router.get("/image/:imageId", characterController.charactersGet);
router.post("/image/:imageId/gameStart", gameController.startGame);
router.post("/image/:imageId/gameEnd", gameController.endGame, userController.addUser);

// router.post("/leaderboard", userController.addUser);

// router.post("/image/:imageId/:user", userController.addUser)
// router.post("/image/:imageId", userController.addUser)

// router.post("/image/:imageId", gameController.clickPost)

// router.get("/image/:imageId", gameController.startGame)

module.exports = router;
