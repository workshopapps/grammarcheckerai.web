const express = require("express");
const leaderBoardRouter = express.Router();
const leaderBoard = require("../controller/leaderBoardController");

leaderBoardRouter.get("/", leaderBoard);

module.exports = leaderBoardRouter;
