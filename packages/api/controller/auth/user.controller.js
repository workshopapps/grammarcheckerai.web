const { response } = require("../../utilities/response");
const { hash } = require("../../utilities/encrypt.utilities");
const { register, findOne } = require("../../repository/user.repository");
const { login } = require("../loginController");

async function registerUser(req, res) {
  const { email, firstName, lastName, password, confirm_password, language } =
    req.body;
  //Check if the user already exist
  const newPassword =
    password === confirm_password
      ? await hash(password)
      : res.status(422).json(
          response({
            success: false,
            error: "Password mismatch",
            message: "Comfirm your password",
          })
        );

  const checkEmailExist = await findOne("userCollection", email);

  if (checkEmailExist)
    return res
      .status(409)
      .json(response({ error: "User already exist", success: false }));

  const data = { email, firstName, lastName, newPassword, language };

  const user = register(data);

  if (!user)
    return res
      .status(500)
      .json(response({ success: false, message: "User not created" }));
  console.log("k");
  return res.status(201).json(user);
  // return login(req, res);
}
// FOR DELETING A USER ACCOUNT
//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = { deleteUser, registerUser };
