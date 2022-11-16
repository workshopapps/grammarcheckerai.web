import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const {PORT, HOST, NODE_ENV} = process.env;

app.listen(PORT, ()=>{ 
    console.log(`server running on ${HOST}:${PORT} in ${NODE_ENV} mode`);
});