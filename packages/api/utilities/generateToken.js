const  jwt = require('jsonwebtoken');
require('dotenv');

const generateToken = (payload, expiresIn = '30m') => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
  return token;
};

const verifyJWTToken = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
				console.log(decoded)
        resolve(decoded);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports = { generateToken, verifyJWTToken }