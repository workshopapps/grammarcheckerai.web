const { Router } = require("express");
const auth = Router();
const {
  validate,
  registerValidationRules,
	reset_password,
	request_reset_password,
} = require("../utilities/validation/auth.validation");
const {
  registerUser, googleAuthUserSignUp
} = require("../controller/auth/user.controller"); 
const { googleAuthURL } = require("../controller/auth/google.user.controller");
const { linkedin } = require("./linkedin-auth");
const {login} = require('../controller/loginController')
const {logout} = require('../controller/logoutcontroller') 
const facebook = require('./facebookAuth');
const { requestForgotPassword, resetPassword } = require("../controller/forgotPasswordController");

auth.post("/signup", registerValidationRules(), validate, registerUser);
auth.get("/google", googleAuthURL);
auth.post("/google", googleAuthUserSignUp);
auth.post("/request-password-reset", request_reset_password(), validate, requestForgotPassword)
auth.post("/password-reset", reset_password(), validate, resetPassword) 

auth.post("/login", login);
auth.post("/logout", logout);
auth.use("/linkedin", linkedin);
auth.use('/facebook', facebook);

module.exports = { auth };
