const dotenv = require('dotenv');

dotenv.config();
const { DB_USER, DB_PWD, DB_HOST, DIALECT, DB_DB } = process.env;

const config = {
  "development": {
    "username": DB_USER,
    "password": DB_PWD,
    "database": DB_DB,
    "host": DB_HOST,
    "dialect": DIALECT
  },
  "test": {
    "username": DB_USER,
    "password": DB_PWD,
    "database": DB_DB,
    "host": DB_HOST,
    "dialect": DIALECT
  },
  "production": {
    "username":DB_USER,
    "password": DB_PWD,
    "database": DB_DB,
    "host": DB_HOST,
    "dialect": DIALECT
  }
}

module.exports = config;
