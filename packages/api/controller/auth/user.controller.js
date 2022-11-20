const { response } = require("../../utilities/response");
const { getTokens } = require("./google.user.controller");
const { register, findOne } = require("../../repository/user.repository");
const { login } = require("../loginController");
const { userCollection } = require("../../database/models/userSchema");

async function registerUser(req, res) {
  let {
    email,
    firstName,
    lastName,
    username,
    password,
    confirm_password,
    language,
  } = req.body;
  //Check if the user already exist
  password =
    password === confirm_password
      ? password
      : res.status(422).json(
          response({
            success: false,
            error: "Password mismatch",
            message: "Comfirm your password",
          })
        );

  const checkEmailExist = await userCollection.findOne({ email });

  if (checkEmailExist)
    return res
      .status(409)
      .json(response({ error: "User already exist", success: false }));

  const data = { email, firstName, lastName, username, password, language };

  const user = await register(data);

  if (!user)
    return res
      .status(500)
      .json(response({ success: false, message: "User not created" }));

  // return res.status(201).json(user);
  return login(req, res);
}
async function googleAuthUserSignUp(req, res) {
  const { name, email } = await getTokens(req);

  console.log(name, email);

  //Check if user already exist
  const user = await userCollection.findOne({ email });
 
  if (user) { 
    //assign token
    const token = user.generateAuthToken();

    const data = {
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.username,
      email: user.email, 
       token,
    };
    return res.status(201).json(data);
  } else {
    const randomUserCode = codeGenerator(36);
    const newName = name.split(" ");

    const data = {
      firstName: newName[0],
      lastName: newName[1],
      email: email,
      username: slugify(name) + randomUserCode,
      password: "",
      role: "user",
      isverified: true,
    };
    const user = await register(data);

    return user;
  }
}
module.exports = { registerUser, googleAuthUserSignUp };
