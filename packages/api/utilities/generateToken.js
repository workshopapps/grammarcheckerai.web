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

    // generate email verification link when verify a newly created account
 const   generateEmailVerificationLink =  async function (user) {
		link = jwt.sign(user, JWT_SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
		verificationLink = `${HOST}/api/v1/verify/${link}`
		return verificationLink
	};

    // verify jwt => returns embeded user object if links is still active
const   verifyLink = async function (link) {
        let isValid = jwt.verify(link, JWT_SECRET )
        if(isValid) return isValid
    }


module.exports = { verifyJWTToken, generateAuthToken, generateHash, comparePassword, generateEmailVerificationLink, verifyLink }