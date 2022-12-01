const { userCollection } = require("../database/models/userSchema");
const { findOne } = require("../repository/user.repository");
const { comparePassword } = require("../utilities/generateToken");
const { response, authResponse } = require("../utilities/response");

async function login(req, res) {
  // retrieve the email and password
  const { email, password } = req.body;

  let user = await users.findOne({ where: { email } });
  // comparing password
  const validPassword = await comparePassword(password);

  if (!validPassword) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  if (!user) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }
  return res.status(200).json(
    response({
      success: true,
      message: "User login successfully",
      data: authResponse(user),
    })
  );
}
module.exports = { login };
