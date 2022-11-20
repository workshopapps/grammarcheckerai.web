const passport  = require('passport');
require('dotenv').config();
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { environment } = require("../config/environment.js");

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
        done(null, user);
});

passport.use(new LinkedInStrategy({
    clientID        : environment.LINKEDIN_CLIENT_ID,
    clientSecret    : environment.LINKEDIN_SECRET_ID,
    callbackURL: environment.CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function (token, tokenSecret, profile, done) {
    return done(null, profile);
  }
));

