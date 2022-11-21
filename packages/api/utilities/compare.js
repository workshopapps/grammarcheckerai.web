const bcrypt = require('bcryptjs');
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { comparePassword };
