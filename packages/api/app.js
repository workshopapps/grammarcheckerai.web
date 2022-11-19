const express = require("express");
const app = express();
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



//Passport Initialized
app.use(passport.initialize());

app.use(express.json()).use(cors());



app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Grit Grammarly 🙌" });
});
app.use('/api/v1/test',(req, res)=>{
  res.status(200).json({message: 'working'})
})
app.use('/api/v1', linkedinAuth)
app.use('/api/v1/login', login)
app.use('/api/v1/logout', logout)
app.use('/api/v1/user-profile/:id', profile)
app.delete("/user", userRouter);
// linked in login
app.use("/", (req, res) => {
  res.status(200).json({ message: req.path });
});

module.exports = app;
