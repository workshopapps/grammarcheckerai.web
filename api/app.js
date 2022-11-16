const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./database");
const homeRoute = require("./routes/home");

//body-parser call
app.use(bodyParser.urlencoded({ extended: false }));

//cors call
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//middleware
app.use(express.json());

//database
(async function db() {
  connection();
})();

//Routes
app.use("/", homeRoute);

//404 error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost, go back now!!!!",
  });
});

module.exports = app;
