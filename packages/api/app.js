const express = require("express");
const cors = require("cors");
const login = require('./routes/loginRoute') //login
const logout = require('./routes/logoutRoute') //logout
const userRouter = require("./routes/userRouter"); // importing user routes


require("./database/index.js"); //load databse

const app = express();

app.use(express.json()).use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Grit Grammarly 🙌" });
});
app.use('/api/v1/login', login)
app.use('/api/v1/logout', logout)
app.delete("/user", userRouter);

exports.app = app;
