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
