const express = require("express");
const cors = require("cors");
const login = require('./routes/loginRoute') //login
const userRouter = require("./routes/userRouter"); // importing user routes

require("./database/index.js"); //load databse

const app = express();

app.use(express.json()).use(cors());

app.delete("/user", userRouter);
app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});
app.use('/api/v1/login', login)

exports.app = app;
