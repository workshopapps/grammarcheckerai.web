const express = require('express');
const facebook = express.Router();
const passport = require('passport');

facebook.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

facebook.get(
  '/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.

    const token = req.user.generateAuthToken();
    res.cookie('x-auth-cookie', token);
    res.redirect('/auth/success');
  }
);

facebook.get('/failed', (req, res) => {
  return res.status(200).json({
    success: false,
    info: 'login failed',
  });
});

facebook.get('/success', (req, res) => {
  return res.status(200).json({
    success: true,
    info: 'login succesfully',
  });
});

module.exports = facebook;
