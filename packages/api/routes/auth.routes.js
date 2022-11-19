const { Router } = require("express");
const auth = Router();
const {
  validate,
  registerValidationRules,
} = require("../utilities/validation/auth.validation");
const {
  registerUser,
  deleteUser,
} = require("../controller/auth/user.controller"); //importing deleteuser controller
const { googleAuthURL } = require("../controller/auth/google.user.controller");
const { linkedinAuth } = require("../routes/linkedin-auth");
const loginController = require('../controller/loginController')
const logoutController = require('../controller/logoutcontroller')
const userProfileController = require('../controller/userProfileController')

auth.post("/signup", registerValidationRules(), validate, registerUser);
auth.post("/google-auth", googleAuthURL);


auth.get("/login", loginController);
auth.get("/logout", logoutController);
auth.get("/linkedin", linkedinAuth);
module.exports = { auth };
