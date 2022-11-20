const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { environment } = require('../config/environment.js');
const User = require('../database/models/userSchema.js');

// used to serialize the user for the session
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: environment.FB_CLIENT_ID,
      clientSecret: environment.FB_CLIENT_SERECT,
      callbackURL: environment.FB_CALLBACK_URL,
      profileFields: [
        'id',
        'displayName',
        'name',
        'picture.type(large)',
        'email',
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user exist
        const oldUser = await User.userCollection.findOne({
          email: profile.emails[0].value,
        });

        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }

      // register user
      try {
        const newUser = await new User.userCollection({
          provider: 'facebook',
          username: `user${profile.id}`,
          email: profile.emails[0].value,
          name: profile.displayName,
        }).save();

        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
