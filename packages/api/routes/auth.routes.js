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
const { linkedin } = require("../routes/linkedin-auth");
const {login} = require('../controller/loginController')
const {logout} = require('../controller/logoutcontroller')
const userProfileController = require('../controller/userProfileController')

auth.post("/signup", registerValidationRules(), validate, registerUser);
auth.post("/google-auth", googleAuthURL);


auth.get("/login", login);
auth.get("/logout", logout);
auth.get("/linkedin", linkedin);

module.exports = { auth };
