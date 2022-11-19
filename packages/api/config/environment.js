const { config } = require("dotenv");

config();

exports.environment = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_URI: process.env.DATABASE_URI,
  NODE_ENV: process.env.NODE_ENV,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
