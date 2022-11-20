const { response } = require("../../utilities/response");
const { hash } = require("../../utilities/encrypt.utilities");
const { register, findOne } = require("../../repository/user.repository");
const { login } = require("../loginController");
const { userCollection } = require("../../database/models/userSchema");

async function registerUser(req, res) {
  let { email, firstName, lastName, password, confirm_password, language } =
    req.body;
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
        
  const checkEmailExist = await userCollection.findOne({email});

  if (checkEmailExist)
    return res
      .status(409)
      .json(response({ error: "User already exist", success: false }));
      
  const data = { email, firstName, lastName, password, language };

  const user = await register(data);

  if (!user)
    return res
      .status(500)
      .json(response({ success: false, message: "User not created" }));
  
  // return res.status(201).json(user);
  return login(req, res);
} 
module.exports = { registerUser };
