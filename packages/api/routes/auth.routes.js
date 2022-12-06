const { Router } = require('express');
const auth = Router();
const {
  validate,
  registerValidationRules,
  reset_password,
  request_reset_password,
  loginValidationRules,
} = require('../utilities/validation/auth.validation');
const {
  registerUser,
  verifyMail,
  googleAuthUserSignUp,
  login,refreshUserToken
} = require('../controller/auth/user.controller');
const {
  googleAuthURL,
  getLinkedinUrl,
  linkedinAccessToken,
  getFacebookURl,
  facebookAccessToken,
} = require('../controller/auth/authThirdPartyController');
const { logout } = require('../controller/logoutcontroller');
const verify = require("../middlewares/auth.middleware");
const {
  requestForgotPassword,
  resetPassword,
} = require('../controller/forgotPasswordController');
const { facebook } = require('./facebookAuth');

auth.post('/signup', registerValidationRules(), validate, registerUser);
auth.get('/verify/:link', verifyMail);

auth.get('/google', googleAuthURL);
auth.post('/google', googleAuthUserSignUp);

auth.post(
  '/request-password-reset',
  request_reset_password(),
  validate,
  requestForgotPassword
);
auth.post('/password-reset', reset_password(), validate, resetPassword);

auth.post('/login', loginValidationRules(), validate, login);
auth.post('/logout', logout);
auth.get('/linkedin', getLinkedinUrl);
auth.post('/linkedin/callback', linkedinAccessToken);
auth.get("/facebook", getFacebookURl);
auth.post("/facebook/callback", facebookAccessToken);
auth.use('/facebook', facebook);
auth.post("/refresh-token", verify, refreshUserToken);

module.exports = { auth };
