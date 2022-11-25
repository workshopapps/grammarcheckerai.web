const {
    getConfirm,
    postSignup,
    postUpload
} = require('../controller/newsLetterController')
const express = require('express')
const router = express.Router()

router
    .get('/confirmNewsletterEmail', getConfirm)
    .post('/signupNewsletterEmail', postSignup)
    .post('/UploadNewsletter', postUpload)

module.exports = router;