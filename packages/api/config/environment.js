const { config } = require("dotenv");

config();

exports.environment = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE_URI: process.env.DATABASE_URI,
    NODE_ENV: process.env.NODE_ENV,
    FILE_SIZE: process.env.FILE_SIZE,
    API_KEY: process.env.API_KEY,
    MODEL_KEY: process.env.MODEL_KEY
};

