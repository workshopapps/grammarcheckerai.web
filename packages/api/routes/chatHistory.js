const express = require("express");
const chatHistoryRouter = express.Router();
const chatHistory = require("../controller/chatHistory");

chatHistoryRouter.get("/", chatHistory);

module.exports=chatHistoryRouter