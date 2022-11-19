const passport = require('passport');
const linkedinAuth = require('express').Router()

linkedinAuth.get('/failed', (req, res) => res.send('You Failed to log in!'))
  
linkedinAuth.get('/good',  (req, res) => {
    return res.status(200).json({message: 'successful'})
})

linkedinAuth.get('/', 
    passport.authenticate('linkedin', {
    scope : ['r_emailaddress', 'r_liteprofile'] 
    }
));

linkedinAuth.get('/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }
));

linkedinAuth.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = {linkedinAuth};