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


// // jwt auth token
const generateAuthToken = (payload) => {
	const token = jwt.sign( payload, JWT_SECRET, {
		expiresIn: "1h",
	});
	return token;
};

const generateHash = async (reqPassword) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(reqPassword, salt);
};

// comparing the password
const comparePassword = async function (reqPassword) {
	const correctPassword = await bcrypt.compare(reqPassword, this.password);
	return correctPassword;
};

// exports.authValidatorSchema = Joi.object().keys({
// 	email: Joi.string()
// 		.email({
// 			minDomainSegments: 2,
// 			tlds: { allow: ["com", "net", "xyz", "io", "co", "org"] },
// 		})
// 		.lowercase()
// 		.required(),
// 	password: Joi.string().min(5).required(),
// });

module.exports = { verifyJWTToken, generateAuthToken, generateHash, comparePassword }