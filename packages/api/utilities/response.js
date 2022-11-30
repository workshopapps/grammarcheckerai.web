const { generateAuthToken } = require("./generateToken");

/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 * @param {boolean} success Status of the request
 */
const response = ({ success, message, data }) => {
  return {
    success: success == null ? true : success,
    message: formatMessage(message),
    count: typeof data === "object" ? data.length : undefined,
    data: data || undefined,
  };
};

const formatMessage = (str) => {
  if (!str) return "";
  // Make first letter capitial
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const authResponse = (userData) => {
	let { id, email } = userData
	let payload = { id, email }
  const user = {
    _id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    language: userData.language,
    token: generateAuthToken(payload),
  };
  return user;
};
module.exports = { response, formatMessage, authResponse };
