const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

router.get(
  '/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    // console.log(req.user.generateAuthToken());

    const token = req.user.generateAuthToken();
    res.cookie('x-auth-cookie', token);
    res.redirect('/auth/success');
  }
);

router.get('/failed', (req, res) => {
  return res.status(200).json({
    success: false,
    info: 'login failed',
  });
});

router.get('/success', (req, res) => {
  return res.status(200).json({
    success: true,
    info: 'login succesfully',
  });
});

module.exports = router;
