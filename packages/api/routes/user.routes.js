const userHandler = require('express').Router();
const {
  userProfile,
  deleteUser,
  updateUser,
} = require('../controller/userProfileController');
const {
  userprofileAccess,
  deleteUserAccess,
} = require('../middlewares/UserRestriction/userAccessControl');

userHandler.get('/profile/:id', userprofileAccess, userProfile);
userHandler.delete('/', deleteUserAccess, deleteUser);
userHandler.post('/profile/update', updateUser);

module.exports = { userHandler };
