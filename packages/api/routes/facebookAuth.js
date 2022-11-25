const express = require('express');
const facebook = express.Router();
const passport = require('passport');
const { environment } = require('../config/environment');
const { BASE_URL, NODE_ENV } = environment;

facebook.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

const clientUrl = NODE_ENV === 'development' ? '/' : BASE_URL;

facebook.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    // Successful authentication, redirect home.

    const token = req.user.generateAuthToken();
    res.cookie('x-auth-cookie', token);
    res.redirect(clientUrl);
  }
);

module.exports = { facebook };
