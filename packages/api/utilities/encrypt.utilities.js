const bcrypt = require("bcrypt");

// Hashing the password
const hash = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const compare = async function (reqPassword) {
    return await bcrypt.compare(reqPassword, this.password); 
};
module.exports = { hash, compare };
