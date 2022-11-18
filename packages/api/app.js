
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter"); // importing user routes

require("./database/index.js"); //load databse 

const app = express();

app.use(express.json()).use(cors());

app.delete('/user', userRouter)

app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

exports.app = app;