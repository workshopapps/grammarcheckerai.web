const { userCollection } = require("../database/models/userSchema");
const { authResponse } = require("../utilities/response");
async function register(data) {
  try {
    const user = await userCollection.create(data);

    return authResponse(user);
  } catch (error) {
    return false;
  }
}

module.exports = {
  register,
};
