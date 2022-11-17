<<<<<<< Updated upstream
=======
const userRouter = require("./routes/userRouter"); // importing user routes

>>>>>>> Stashed changes
require("./database/index.js"); //load databse

const userRouter = require("./routes/userRouter"); // importing user routes
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()).use(cors);

<<<<<<< Updated upstream
app.use(userRouter);
=======
>>>>>>> Stashed changes
app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

exports.app = app;
