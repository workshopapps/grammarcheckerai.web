const express = require("express");
const chatHistoryRouter = express.Router();
const chatHistoryController = require("../controller/chatHistoryController");

chatHistoryRouter.get("/", chatHistoryController);

module.exports = chatHistoryRouter;
