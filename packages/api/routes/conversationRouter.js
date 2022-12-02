const express = require("express");
const conversationRouter = express.Router();
const getBotResponse = require("../controller/sendAudioController.js");
const endConversation = require("../controller/endConversationController");
const startConversation = require("../controller/startConversationController");
const {
  userConversationAccess,
} = require("../middlewares/UserRestriction/userAccessControl");
const textResponse = require("../controller/sendTextController");

// const uploadAudio = require("../middlewares/s3Bucket.js");
const uploadFile1 = require("../controller/uploadBuffer.js");
const saveAudio = require("../controller/uploadAudioController.js");
const uploadFile = require("../middlewares/audio.middleware.js");

// conversationRouter.post("/uploadAudio", uploadAudio.single("file"), saveAudio);
conversationRouter.post("/uploadAudio", uploadFile1, saveAudio);
conversationRouter.get("/start", userConversationAccess, startConversation);
conversationRouter.get("/end", endConversation);
conversationRouter.post("/sendAudio", uploadFile, getBotResponse);
conversationRouter.post("/sendText", textResponse);


module.exports = conversationRouter;

