const { response } = require("../../utilities/response");
const { getTokens } = require("./google.user.controller");
const { register, findOne } = require("../../repository/user.repository");
const { loginUser } = require("../loginController");
const { userCollection } = require("../../database/models/userSchema");
const { slugify } = require("../../utilities/compare");

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
  return loginUser(user, res)
}

async function googleAuthUserSignUp(req, res) {
  const {name, email} = await getTokens(req.query.code);

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
    return loginUser(user, res)
  } else { 
    const randomUserCode = (Math.random() + 1).toString(36).substring(7);
    const newName = name.split(" ");

    const data = {
      firstName: newName[0],
      lastName: newName[1],
      email: email,
      username: slugify(name) + randomUserCode,
      password: "password"  
    };
    const user = await register(data);

    if (!user)
    return res
      .status(500)
      .json(response({ success: false, message: "User not created" }));

    return loginUser(user, res)
  }
}
module.exports = { registerUser, googleAuthUserSignUp };
