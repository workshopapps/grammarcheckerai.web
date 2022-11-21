const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

const { environment } = require("./config/environment");
const testRoute = require("./routes/testRoutes");
require("express-async-errors");
require("./database/index");
const passport = require("passport");
require("./services/linkedinStrategy");
const { routeHandler } = require("./routes/index.route"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./Tests/test.json");

//Passport Initialized
app.use(passport.initialize());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

const sess = {
  secret: environment.SESSION_SECRET,
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

app.use("/test", testRoute);
app.use("/v1", routeHandler);
app.get("*", (req, res) => {
  res.status(200).json({ message: "Welcome to Grit Grammarly 🙌" });
});
module.exports = app;
