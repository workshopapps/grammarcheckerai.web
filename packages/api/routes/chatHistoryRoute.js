const express = require('express')
const router = express.Router()
const historyController = require('../controller/chatHistoryController')

router.get('/:userId', historyController.history )

module.exports = router