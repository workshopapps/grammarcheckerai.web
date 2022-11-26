const express = require('express');
const quickTranscribeController = require('../controller/quickTranscribeController');
const quickTranscribe = express.Router();
const uploadFile = require('../middlewares/audio.middleware.js');

quickTranscribe.post('/', uploadFile, quickTranscribeController);

module.exports = quickTranscribe;
