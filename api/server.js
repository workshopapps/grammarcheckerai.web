import app from "./app.js";
import { environment }from "./config/environment.js";

const {PORT, HOST, NODE_ENV} = environment;

app.listen(PORT, ()=>{ 
    console.log(`server running on ${HOST}:${PORT} in ${NODE_ENV} mode`);
});