const express = require("express");
const app = express();
const cors = require("cors");
const login = require('./routes/loginRoute') //login
const logout = require('./routes/logoutRoute') //logout
const userRouter = require("./routes/userRouter"); // importing user routes

require("./database/index.js"); //load databse
const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);
app.use(express.json()).use(cors());

app.delete("/user", userRouter);

app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

exports.app = app;
