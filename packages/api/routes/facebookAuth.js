const express = require('express');
const passport = require('passport');
const facebook = express.Router();

facebook.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

const clientUrl = 'https://speakbetter.hng.tech/social/';

facebook.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: clientUrl,
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateAuthToken();
    res.cookie('x-auth-cookie', token);
    res.redirect(`${clientUrl}?_id=${req.user._id}&token=${token}`);
  }
);

module.exports = { facebook };
