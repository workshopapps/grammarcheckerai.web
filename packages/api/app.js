<<<<<<< HEAD
// const userRouter = require("./routes/userRouter"); // importing user routes

// require("./database/index.js"); //load databse

// const userRouter = require("./routes/userRouter"); // importing user routes
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()).use(cors);
=======

const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter"); // importing user routes

require("./database/index.js"); //load databse 

const app = express();

app.use(express.json()).use(cors());

app.delete('/user', userRouter)
>>>>>>> 91e521f3b1cb8296e19d5b467a84c63fc403d636

app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

exports.app = app;
