const express = require("express");
const cors = require("cors");
const session = require("express-session");

const { environment } = require("./config/environment");
const userRouter = require("./routes/userRouter"); // importing user routes

require("./database/index.js"); //load databse

const app = express();

app.use(express.json()).use(cors());

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

app.use(session(sess));

app.delete("/user", userRouter);

app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

exports.app = app;
