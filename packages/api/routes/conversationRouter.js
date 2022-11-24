const express = require('express');
const conversationRouter = express.Router();
const getBotResponse = require('../controller/sendAudioController.js');
const uploadFile = require('../middlewares/audio.middleware.js');

conversationRouter.post('/', uploadFile, getBotResponse)

module.exports = conversationRouter;