import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const {PORT, HOST, NODE_ENV} = process.env;

const app = express();

app.use(express.json());
app.use('/', (req, res)=>{
    res.status(200).json({message: 'welcome'})
})



app.listen(PORT, ()=>{ 
    console.log(`server running on ${HOST}:${PORT} in ${NODE_ENV} mode`);
});
export default app;