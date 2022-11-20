const { config } = require("dotenv");

config();

exports.environment = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    NODE_ENV:process.env.NODE_ENV,
    DATABASE_URI: process.env.DATABASE_URI,
    LINKEDIN_CLIENT_ID:process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_SECRET_ID:process.env.LINKEDIN_SECRET_ID,
    CALLBACK_URL: process.env.CALLBACK_URL
};
