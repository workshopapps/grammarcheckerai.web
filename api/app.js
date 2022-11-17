import "./database/index.js"; // load database
import cors from "cors";

import { environment } from "./config/environment.js";

import express from "express";

const app = express();

app.use(express.json()).use(cors);

app.get("/", (req, res) => res.send("Connected"));

app.listen(environment.PORT, () =>
  console.log(`App is running on port ${environment.PORT}`)
);
