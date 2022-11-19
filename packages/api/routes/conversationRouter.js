const express = require('express');
const conversationRouter = express.Router();
const getBotResponse = require('../controller/sendAudioController');
const uploadFile = require('../middleware/audioFileUpload');

conversationRouter.post('/sendAudio', uploadFile, getBotResponse)

module.exports = conversationRouter;