const { config } = require("dotenv");

config();

exports.environment = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST,
    DATABASE_URI: process.env.DATABASE_URI,
    FROM_EMAIL: 'admin@grittygrammar.com'
    
};
