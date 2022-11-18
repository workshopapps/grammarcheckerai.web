const express = require('express')
const router = express.Router()
const logoutController = require('../controller/logoutcontroller')

router.get('/api/v1/logout', logoutController.logout)

module.exports = router;
   
