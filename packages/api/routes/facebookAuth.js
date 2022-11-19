const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    // console.log(req.user.generateAuthToken());

    const token = req.user.generateAuthToken();
    res.cookie('x-auth-cookie', token);
    res.redirect('/auth/profile');
  }
);

router.get('/failed', (req, res) => {
  return res.status(200).json({
    success: false,
    info: JSON.stringify(req.user),
  });
});

router.get('/profile', (req, res) => {
  return res.status(200).json({
    success: true,
  });
});

module.exports = router;
