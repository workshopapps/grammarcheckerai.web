const userHandler = require('express').Router();
const {userProfile, deleteUser,  updateUser } = require('../controller/userProfileController')

 
userHandler.get('/profile/:id', userProfile);
userHandler.delete('/', deleteUser);
userHandler.post('/profile/update',  updateUser);

module.exports = {userHandler}