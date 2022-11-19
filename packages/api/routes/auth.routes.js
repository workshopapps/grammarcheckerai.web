const { Router } = require("express");
const auth = Router();
const {
  validate,
  registerValidationRules,
} = require("../utilities/validation/auth.validation");
const {
  registerUser,
} = require("../controller/auth/user.controller"); //importing deleteuser controller
const { googleAuthURL } = require("../controller/auth/google.user.controller");
const { linkedin } = require("./linkedin-auth");
const {login} = require('../controller/loginController')
const {logout} = require('../controller/logoutcontroller')
const userProfileController = require('../controller/userProfileController')
const facebookAuthRoutes = require('./facebookAuth');
 

auth.post("/signup", registerValidationRules(), validate, registerUser);
auth.post("/google-auth", googleAuthURL);


auth.post("/login", login);
auth.get("/logout", logout);
auth.use("/linkedin", linkedin);
auth.use('/facebook', facebookAuthRoutes);

module.exports = { auth };
