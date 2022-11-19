const passport = require('passport');
const router = require('express').Router()

router.get('/failed', (req, res) => res.send('You Failed to log in!'))
  
router.get('/good',  (req, res) => {
    return res.status(200).json({message: 'successful'})
})

router.get('/auth/linkedin', 
    passport.authenticate('linkedin', {
    scope : ['r_emailaddress', 'r_liteprofile'] 
    }
));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }
));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;