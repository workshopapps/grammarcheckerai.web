const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { environment } = require("./config/environment");
const expressFileUpload = require('express-fileupload');
const { SESSION_SECRET } = environment;

require("express-async-errors");
require("./database/index");
const passport = require("passport");
require("./services/linkedinStrategy");
require("./services/facebookStrategy");
const { routeHandler } = require("./routes/index.route"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./Tests/test.json");

//Passport Initialized
app.use(passport.initialize()).use(express.json()).use(cors());

const sess = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app
  .use(session(sess))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/v1", routeHandler);
app.use(expressFileUpload());
app.use(express.urlencoded({
  extended: true
}));

app.get("*", (req, res) => {
  res.status(200).json({
    message: "Welcome to Grit Grammarly 🙌",
    user: "CORS enabled",
  });
});
module.exports = app;
