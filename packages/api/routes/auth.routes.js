const { Router } = require("express");
const auth = Router();
const {
	validate,
	registerValidationRules,
	reset_password,
	request_reset_password,
	loginValidationRules,
} = require("../utilities/validation/auth.validation");
const {
  registerUser,
  verifyMail,
  googleAuthUserSignUp,
} = require("../controller/auth/user.controller");
const { googleAuthURL, getLinkedinUrl, linkedinAccessToken, getFacebookURl, facebookAccessToken } = require("../controller/auth/authThirdPartyController");
const { login } = require("../controller/loginController");
const { logout } = require("../controller/logoutcontroller");
// const { facebook } = require("./facebookAuth");
const {
	requestForgotPassword,
	resetPassword,
} = require("../controller/forgotPasswordController");

auth.post("/signup", registerValidationRules(), validate, registerUser);
auth.get("/verify/:link", verifyMail);

auth.get("/google", googleAuthURL);
auth.post("/google", googleAuthUserSignUp);
auth.post(
	"/request-password-reset",
	request_reset_password(),
	validate,
	requestForgotPassword
);
auth.post("/password-reset", reset_password(), validate, resetPassword);

auth.post("/login", loginValidationRules(), validate, login);
auth.post("/logout", logout);
auth.get("/linkedin", getLinkedinUrl);
auth.get("/linkedin/callback", linkedinAccessToken)
// auth.get("/facebook", getFacebookURl)
// auth.get("/facebook/callback", facebookAccessToken)

// auth.use("/facebook", facebook);

module.exports = { auth };
