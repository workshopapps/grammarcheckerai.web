<<<<<<< HEAD
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
=======
import "./database/index.js"; //load databse

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json())
   .use(cors);
   
app.use('/', (req, res)=>{
    res.status(200).json({message: 'welcome'})
});


export default app;
>>>>>>> 56e3a4c (Quick fix database schema)
