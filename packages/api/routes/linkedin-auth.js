const passport = require('passport');
const linkedin = require('express').Router()

linkedin.get('/failed', (req, res) => res.send('You Failed to log in!'))
  
linkedin.get('/good',  (req, res) => {
    return res.status(200).json({message: 'successful'})
})

linkedin.get('/', 
    passport.authenticate('linkedin', {
    scope : ['r_emailaddress', 'r_liteprofile'] 
    }
));

linkedin.get('/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/Profile',
        failureRedirect: '/login'
    }
));

linkedin.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = {linkedin};
