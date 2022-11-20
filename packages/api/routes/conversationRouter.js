const express = require('express');
const conversationRouter = express.Router();
const getBotResponse = require('../controller/sendAudioController');
const endConversation = require('../controller/endConversationController');
const startConversation = require('../controller/startConversationController');
const uploadFile = require('../middleware/audioFileUpload');

conversationRouter.get('/start', startConversation);
conversationRouter.get('/end', endConversation);
conversationRouter.post('/sendAudio', uploadFile, getBotResponse);

module.exports = conversationRouter;