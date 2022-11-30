const userHandler = require("express").Router();
const {
  userProfile,
  deleteUser,
  updateUser,
} = require("../controller/userProfileController");
const {
  userprofileAccess,
  deleteUserAccess,
  updateUserAccess,
} = require("../middlewares/UserRestriction/userAccessControl");
const passwordController = require("../controller/forgotPasswordController");

userHandler.get("/profile/:id", userprofileAccess, userProfile);
userHandler.delete("/", deleteUserAccess, deleteUser);
userHandler.post("/profile/update", updateUserAccess, updateUser);
userHandler.get(
  "/profile/resetPassword",
  passwordController.requestForgotPassword
);
userHandler.post("/profile/resetPassword", passwordController.resetPassword);

module.exports = { userHandler };
