const express = require("express");
const conversationRouter = express.Router();
const { getBotResponse } = require("../controller/sendAudioController.js");

const endConversation = require("../controller/endConversationController");
const startConversation = require("../controller/startConversationController");
const getTranscription = require("../controller/getTranscriptionController");
const {
  userConversationAccess,
} = require("../middlewares/UserRestriction/userAccessControl");
const textResponse = require("../controller/sendTextController");

// const uploadAudio = require("../middlewares/s3Bucket.js");
const fileUploadToS3Bucket = require("../controller/uploadBuffer.js");
const saveAudio = require("../controller/uploadAudioController.js");
const uploadFile = require("../middlewares/audio.middleware.js");

// conversationRouter.post("/uploadAudio", uploadAudio.single("file"), saveAudio);
conversationRouter.post("/uploadAudio", fileUploadToS3Bucket, saveAudio);
conversationRouter.get("/start", userConversationAccess, startConversation);
conversationRouter.get("/end", endConversation);
conversationRouter.post("/sendAudio", uploadFile, getBotResponse);
conversationRouter.post("/sendText", textResponse);
conversationRouter.post("/assemblyAICb", getTranscription);

module.exports = conversationRouter;
