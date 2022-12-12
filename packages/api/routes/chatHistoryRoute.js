const express = require("express");
const chatHistoryRouter = express.Router();
const chatHistoryController = require("../controller/chatHistoryController");
const deleteChatHistoryController = require("../controller/deleteChatHistoryController");

chatHistoryRouter.get("/:userId", chatHistoryController);
chatHistoryRouter.delete("/:userId", deleteChatHistoryController);

module.exports = chatHistoryRouter;
