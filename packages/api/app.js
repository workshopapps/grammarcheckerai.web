const express = require("express");
const app = express();
const cors = require("cors");
require('express-async-errors')
require('./database/index')
const passport = require('passport');
require('./services/linkedinStrategy') 
const {routeHandler} = require('./routes/index.route');


//Passport Initialized
app.use(passport.initialize());

app.use(express.json()).use(cors());


app.use('/api/v1/test',(req, res)=>{
  res.status(200).json({message: 'working'})
})

app.use('/api/v1', routeHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Grit Grammarly 🙌" });
});
module.exports = app;
