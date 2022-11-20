const express = require('express');
const conversationRouter = express.Router();
const getBotResponse = require('../controller/sendAudioController.js');
const uploadFile = require('../middleware/audioFileUpload.js');

conversationRouter.post('/', uploadFile, getBotResponse)

module.exports = conversationRouter;