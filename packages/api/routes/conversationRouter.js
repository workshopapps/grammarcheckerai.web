const express = require('express');
const conversationRouter = express.Router();
const getBotResponse = require('../controller/sendAudioController');
const uploadFile = require('../middleware/audioFileUpload');

conversationRouter.post('/', uploadFile, getBotResponse)

module.exports = conversationRouter;