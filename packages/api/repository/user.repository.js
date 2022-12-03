const { userCollection } = require("../database/models/userSchema");
const { authResponse } = require("../utilities/response");
async function register(data) {
  try {
    const user = await userCollection.create(data);
		console.log(user)
    return authResponse(user);
  } catch (error) {
		console.log(error)
    return false;
  }
}

module.exports = {
  register,
};
