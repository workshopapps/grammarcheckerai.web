const express = require('express')
const router = express.Router()
const historyController = require('../controller/chatHistoryController')

router.get('/chathistory/:userId', historyController )

module.exports = router