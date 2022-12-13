const express = require("express");
const chatHistoryRouter = express.Router();
const chatHistoryController = require("../controller/chatHistoryController");
const deleteChatHistoryController = require("../controller/deleteChatHistoryController");
const {
  protectChatHistory,
} = require("../middlewares/UserRestriction/userAccessControl");

chatHistoryRouter.get("/", protectChatHistory, chatHistoryController);
chatHistoryRouter.delete("/", protectChatHistory, deleteChatHistoryController);

module.exports = chatHistoryRouter;
