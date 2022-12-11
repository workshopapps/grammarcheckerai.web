const axios = require("axios");
const { environment } = require("../config/environment");
const { PORT, HOST,} = environment;

const instance = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
});

module.exports = instance;

