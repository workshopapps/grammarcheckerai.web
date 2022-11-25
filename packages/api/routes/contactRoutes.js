const express = require('express')
const router = express.Router()
const contactUsController = require ('../controller/contactUsController')

router.post('/', contactUsController )

module.exports = router