const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter'); // importing user routes
const authRouter = require('./routes/auth'); // importing auth routes
const passport = require('passport');
const session = require('express-session');

require('./database/index.js'); //load databse

const app = express();

app.use(express.json()).use(cors());
app.use(passport.initialize());
require('./services/facebookStrategy');

app.use(session({ secret: 'mysecret!!!!' }));

app.use('/auth', authRouter);
app.delete('/user', userRouter);

app.use('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});

exports.app = app;
