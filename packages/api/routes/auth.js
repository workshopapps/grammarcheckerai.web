const express = require('express');
const router = express.Router();
const signUp = require('../controller/signUp');
const facebookAuthRoutes = require('./facebookAuth');

router.post('/signup', signUp);
router.use('/', facebookAuthRoutes);

module.exports = router;
