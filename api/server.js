const dotenv = require("dotenv");
dotenv.config();
const app = require("./app")

const {PORT, HOST, NODE_ENV} = process.env;

app.listen(PORT, ()=>{ 
    console.log(`server running on ${HOST}:${PORT} in ${NODE_ENV} mode`);
});
