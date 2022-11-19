const express = require("express");
const cors = require("cors");
require('express-async-errors')
require('dotenv').config()
const authMiddleware =require('./middlewares/authMiddleware')
const login = require('./routes/loginRoute') //login
const logout = require('./routes/logoutRoute') //logout
const userRouter = require("./routes/userRouter"); // importing user routes
const passport = require('passport');
require('./services/linkedinStrategy')
const linkedinAuth = require('./routes/linkedin-auth')
const profile = require("./routes/userProfileRoute")// Get user profile

require("./database/index.js"); //load databse

const app = express();

//Passport Initialized
app.use(passport.initialize());

app.use(express.json()).use(cors());

//login route
app.use('/v1/login', login)

// linked in login
app.use('/v1', linkedinAuth)

app.delete("/user", userRouter);
app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Grit Grammarly 🙌" });
});
app.use('/api/v1/login', login)
app.use('/api/v1/logout', logout)
app.use('/api/v1/user-profile/:id', profile)
app.delete("/user", userRouter);

exports.app = app;
