const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const Memorystore = require("memorystore")(session);
const { environment } = require("./config/environment");
const { SESSION_SECRET } = environment;
const expressFileUpload = require("express-fileupload");
require("express-async-errors");
require("./database/index");
const passport = require("passport");
require("./services/linkedinStrategy");
require("./services/facebookStrategy");
const { routeHandler } = require("./routes/index.route"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./Tests/test.json");

//Passport Initialized
app
  .use(passport.initialize())
  .use(express.json())
  .use(
    cors({
      origin: "*",
    })
  );

const sess = {
  store: new Memorystore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: {},
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  // sess.cookie.secure = true; // serve secure cookies
}

app
  .use(session(sess))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/v1", routeHandler);
app.use(expressFileUpload());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//welcome note
app.get("/v1", (req, res) => {
  res.status(200).json({
    message: "Welcome to Speak Better 🗣️ 🗣️ 🗣️",
    user: "CORS enabled",
  });
});

//404 error
app.all("*", (req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost, path not found.",
  });
});

module.exports = app;
