const userHandler = require('express').Router();
const {userProfile, deleteUser} = require('../controller/userProfileController')

 
userHandler.get('/profile/:id', userProfile);
userHandler.delete('/', deleteUser);

module.exports = {userHandler}