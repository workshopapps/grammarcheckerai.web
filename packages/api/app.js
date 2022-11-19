const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRouter"); // importing user routes
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
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
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Grit Grammarly 🙌" });
});
app.delete("/user", userRouter);

module.exports = app;
