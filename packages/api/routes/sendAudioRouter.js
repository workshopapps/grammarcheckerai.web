const express = require('express');
const sendAudioRouter = express.Router();
const getBotResponse = require('../controller/sendAudioController');
const uploadFile = require('../middleware/audioFileUpload');

sendAudioRouter.post('/', uploadFile, getBotResponse)

module.exports = sendAudioRouter;