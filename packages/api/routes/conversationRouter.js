const express = require("express");
const conversationRouter = express.Router();
const getBotResponse = require("../controller/sendAudioController.js");
const endConversation = require("../controller/endConversationController");
const startConversation = require("../controller/startConversationController");
const {
  userConversationAccess,
} = require("../middlewares/UserRestriction/userAccessControl");

const create = require("../middlewares/s3.js");
const uploadAudio = require("../middlewares/s3Bucket.js");
const saveAudio = require("../controller/uploadAudioController.js");
const uploadFile = require("../middlewares/audio.middleware.js");

conversationRouter.post("/createBucket", create);
conversationRouter.post("/uploadAudio", uploadAudio.single("file"), saveAudio);
conversationRouter.get("/start", userConversationAccess, startConversation);
conversationRouter.get("/end", endConversation);
conversationRouter.post("/sendAudio", uploadFile, getBotResponse);

module.exports = conversationRouter;
