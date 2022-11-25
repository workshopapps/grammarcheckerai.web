const  jwt = require('jsonwebtoken');
const { environment } = require('../config/environment');
require('dotenv');
const {JWT_SECRET} = environment;

const verifyJWTToken = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        
				resolve(decoded)
      } else {
        resolve(false);
      }
    });
  });
};

module.exports = {  verifyJWTToken }