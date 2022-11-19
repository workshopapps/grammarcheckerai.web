const userHandler = require('express').Router();
const {userProfile} = require('../controller/userProfileController')

 
userHandler.get('/profile/:id', userProfile);


module.exports = {userHandler}