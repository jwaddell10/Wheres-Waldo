const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const characterController = require("../controllers/characterController");
const userController = require("../controllers/userController");

router.get("/image/:imageId", characterController.charactersGet);

router.post("/image/:imageId/gameStart", gameController.startGame);
router.post("/image/:imageId/gameEnd", gameController.endGame);

router.post("/image/:imageId/leaderboard", gameController.addUser);

router.get("/image/:imageId/leaderboard", userController.getUsers)

module.exports = router;
