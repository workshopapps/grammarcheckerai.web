const express = require('express')
const router = express.Router()
const logoutController = require('../controller/logoutcontroller')

router.post('/', logoutController.logout)

module.exports = router;
   