const userHandler = require('express').Router();
const {userProfile, deleteUser} = require('../controller/userProfileController')

 
userHandler.get('/profile/:id', userProfile);
userHandler.delete('/delete_user', deleteUser);

module.exports = {userHandler}