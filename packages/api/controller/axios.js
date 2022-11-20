const axios = require("axios"); ;

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

module.exports = instance;
