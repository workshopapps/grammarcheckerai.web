const express = require('express')
const router = express.Router()
const historyController = require('../controller/correctionHistoryController')

router.get('/correctionhistory/:userId', historyController )

module.exports = router