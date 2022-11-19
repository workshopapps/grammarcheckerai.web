const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter'); // importing user routes
const authRouter = require('./routes/auth'); // importing auth routes
const passport = require('passport');
const session = require('express-session');
const { environment } = require('./config/environment');

require('./database/index.js'); //load databse

const app = express();

app.use(express.json()).use(cors());
app.use(passport.initialize());
require('./services/facebookStrategy');

app.use(session({ secret: environment.SESSION_SECRET }));

app.use('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});
app.use('/api/v1/auth', authRouter);
app.delete('/user', userRouter);

exports.app = app;
