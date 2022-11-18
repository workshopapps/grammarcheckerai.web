const { config } = require("dotenv");

config();

exports.environment = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URI_PROD: process.env.DATABASE_URI_PROD,
    DATABASE_URI_TEST: process.env.DATABASE_URI_TEST,
    DATABASE_URI_DEVELOP: process.env.DATABASE_URI_DEVELOP
};
