const express = require("express");
const chatHistoryRouter = express.Router();
const {
  getChatHistory,
  deleteChatHistory,
  clearChatHistory,
} = require("../controller/chatHistoryController");
const {
  protectChatHistory,
} = require("../middlewares/UserRestriction/userAccessControl");

chatHistoryRouter.get("/", protectChatHistory, getChatHistory);
chatHistoryRouter.delete("/:messageId", protectChatHistory, deleteChatHistory);
chatHistoryRouter.delete("/", protectChatHistory, clearChatHistory);

module.exports = chatHistoryRouter;
