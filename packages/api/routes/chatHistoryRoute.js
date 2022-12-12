const express = require("express");
const chatHistoryRouter = express.Router();
const chatHistoryController = require("../controller/chatHistoryController");
const deleteChatHistoryController = require("../controller/deleteChatHistoryController");

chatHistoryRouter.get("/", chatHistoryController);
chatHistoryRouter.delete("/", deleteChatHistoryController);

module.exports = chatHistoryRouter;
