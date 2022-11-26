const express = require('express');
const quickTranscribe = require('../controller/quickTranscribeController');
const router = express.Router();
const uploadFile = require('../middlewares/audio.middleware.js');

router.post('/', uploadFile, quickTranscribe);

module.exports = router;

