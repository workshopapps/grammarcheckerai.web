const { response } = require("../../utilities/response");
const { getTokens } = require("./google.user.controller");
const { register } = require("../../repository/user.repository"); 
const { users } = require("../../models");
const { slugify } = require("../../utilities/compare");
const { generateEmailVerificationLink } = require("../../utilities/generateToken"); 
const emailService = require("../../services/email.service");
const { environment } = require("../../config/environment");
const { SIGNUP_TEMPLATE_ID } = environment;
const bcrypt = require("bcryptjs");

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
            message: "Password mismatch, Comfirm your password",
          })
        );

  const checkEmailExist = await users.findOne({  where: { email } });

  if (checkEmailExist)
    return res
      .status(409)
      .json(response({ message: "User already exist", success: false }));

	const salt = await bcrypt.genSalt(10);
	password = await bcrypt.hash(password, salt);

  const data = { email, firstName, lastName, username, password, language };
	const user = await register(data);

  if (!user)
    return res
      .status(500)
      .json(response({ success: false, message: "User not created" }));

      const verificationLink = generateEmailVerificationLink(user);
        // compose mail object
        let mailData = {
          to: email,
          subject: "Verify Your Account",
          body: verificationLink 
      }


await emailService(mailData);

        // send success message
        res.status(200).json({
            message: "Verification mail sent successfully",
            data: user
        })
}



async function googleAuthUserSignUp(req, res) {
  const { name, email } = await getTokens(req.query.code);

  //Check if user already exist
  const user = await users.findOne({  where: { email } });

  if (user) {
    const data = {
      _id: user._id,
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.username,
      email: user.email,
      language: user.language,
      token: user.generateAuthToken(),
    };
    return res.status(200).json(
      response({
        success: true,
        message: "User logged in Sucessfully",
        data: data,
      })
    );
  } else {
    const randomUserCode = (Math.random() + 1).toString(36).substring(7);
    const newName = name.split(" ");

    const data = {
      firstName: newName[0],
      lastName: newName[1],
      email: email,
      username: slugify(name) + randomUserCode,
      password: "password",
    };
    const user = await register(data);

    if (!user)
      return res
        .status(500)
        .json(response({ success: false, message: "User not created" }));

    return res.status(201).json(
      response({
        success: true,
        message: "User created successfully",
        data: user,
      })
    );
  }
};


async function verifyMail (req, res) {
  let verificationLink = req.params.link

  try {
      let user = await verifyLink(verificationLink)
      if (!user) {
          throw new Error("Link expired")
      }

      res
      .status(200)
      .redirect("api/v1/login")
  }
  catch (err) {
      res.status(400).json({
          error: err.message
      })
  }
}




module.exports = { registerUser, googleAuthUserSignUp, verifyMail};


