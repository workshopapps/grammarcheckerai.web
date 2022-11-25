const { Router } = require('express');
const auth = Router();
const {
  validate,
  registerValidationRules,
} = require('../utilities/validation/auth.validation');
const {
  registerUser,
  googleAuthUserSignUp,
} = require('../controller/auth/user.controller');
const { googleAuthURL } = require('../controller/auth/google.user.controller');
const { linkedin } = require('./linkedin-auth');
const { login } = require('../controller/loginController');
const { logout } = require('../controller/logoutcontroller');
const { facebook } = require('./facebookAuth');

auth.post('/signup', registerValidationRules(), validate, registerUser);
auth.get('/google', googleAuthURL);
auth.post('/google', googleAuthUserSignUp);

auth.post('/login', login);
auth.post('/logout', logout);
auth.use('/linkedin', linkedin);
auth.use('/facebook', facebook);

module.exports = { auth };
