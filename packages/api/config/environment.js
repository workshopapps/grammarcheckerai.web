const { config } = require('dotenv');

config();

exports.environment = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_URI: process.env.DATABASE_URI,
  FB_CLIENT_ID: process.env.FB_CLIENT_ID,
  FB_CLIENT_SERECT: process.env.FB_CLIENT_SERECT,
  FB_CALLBACK_URL: process.env.FB_CALLBACK_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
