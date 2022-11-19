const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter"); // importing user routes

swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./Tests/test.json')

require("./database/index.js"); //load databse

const app = express();


app.use(express.json()).use(cors())
   .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // loaded swagger documentation


app.delete("/user", userRouter);

app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

exports.app = app;
