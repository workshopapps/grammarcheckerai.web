const express = require('express')
const router = express.Router()
const userProfileController = require('../controller/userProfileController')

router.get('/', userProfileController.userProfile)

module.exports = router;