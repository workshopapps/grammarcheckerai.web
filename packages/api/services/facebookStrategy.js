const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { environment } = require('../config/environment.js');
const {
  FB_CALLBACK_URL,
  FB_CALLBACK_URL_DEV,
  FB_CLIENT_ID,
  FB_CLIENT_SERECT,
  NODE_ENV,
} = environment;
const User = require('../database/models/userSchema.js');

// used to serialize the user for the session
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
const fbCallbackUrl =
  NODE_ENV === 'development' ? FB_CALLBACK_URL_DEV : FB_CALLBACK_URL;

//facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: FB_CLIENT_ID,
      clientSecret: FB_CLIENT_SERECT,
      callbackURL: fbCallbackUrl,

      profileFields: [
        'id',
        'displayName',
        'name',
        'picture.type(large)',
        'email',
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
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
        const newUser = new User.userCollection({
          provider: 'facebook',
          username: `user${profile.id}`,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          password: 'password',
        });
        // console.log(newUser, '+++++++++++++++++');
        await newUser.save();

        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
