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
async function deleteUser(req, res) {
  const { email, password } = req.body;

  // checking if all required field are provided
  if (!email || !password) {
    res.status(400);
    res.json({ message: "please provide user email and password" });
    return;
  }
  k8;

  // checking for user in our database using the email provided
  let user;

  // if user does not exist
  if (!user) {
    res.status(404);
    res.json({ message: "no user found with the email provided" });
    return;
  }

  // verify that the user password is correct
  let isCorrect;
  // if password is not correct
  if (!isCorrect) {
    res.status(401);
    res.json({ message: "you are not authorized to delete this account" });
    return;
  }

  // if user exist and password is correct
  if (user) {
    // delete user from data base
    res.status(200);
    res.json({ message: "you have successfully deleted your account" });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = { deleteUser, registerUser };
