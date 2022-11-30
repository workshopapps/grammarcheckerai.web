const { users } = require("../models");
const { authResponse } = require("../utilities/response");

async function register(data) {
  try {
    const user = await users.create(data);

    return authResponse(user);
  } catch (error) {
    return false;
  }
}

module.exports = {
  register,
};
