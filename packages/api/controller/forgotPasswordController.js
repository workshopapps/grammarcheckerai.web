const express = require("express");
const app = express();
const { response } = require("../utilities/response");
const { userCollection } = require("../database/models/userSchema");
const { environment } = require("../config/environment.js");
const { verifyJWTToken } = require("../utilities/generateToken");
const emailService = require("../services/email.service");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { BASE_URL, RESET_PASSWORD_TEMPLATE_ID, PASSWORD_CHANGED_TEMPLATE_ID } =
  environment;

exports.requestForgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userCollection.findOne({ email });

  if (!user) {
    return res.status(409).json(
      response({
        message: `User with email ${email} does not exist`,
        success: false,
      })
    );
  }

  const token = user.generateAuthToken();
  const reset_password_url = `${BASE_URL}/v1/auth/password-reset?token=${token}`;
  await emailService({
    to: email,
    subject: "Password Reset",
    body: "sample text",
    templateId: RESET_PASSWORD_TEMPLATE_ID,
    data: {
      name: user.firstName,
      url: reset_password_url,
    },
  })
    .then(() => {
      return res.status(200).json(
        response({
          message: "A mail was just sent to this email address",
          success: true,
        })
      );
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json(
        response({
          message: "Something went wrong while processing this request",
          success: false,
        })
      );
    });
};

exports.resetPassword = async (req, res) => {
  const { new_password, confirm_password } = req.body;
  const { token } = req.query;

  try {
    //Check if the user already exist
    if (new_password !== confirm_password) {
      return res.status(422).json(
        response({
          success: false,
          message: "Password mismatch, Comfirm your password",
        })
      );
    }

    const decodeToken = await verifyJWTToken(token);

    if (!decodeToken) {
      return res
        .status(401)
        .json(response({ message: "Invalid Token", success: false }));
    }

    const email = req.body.email;
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json(response({ message: "User does not exist", success: false }));
    }

    const password = await user.generateHash(new_password);

    await user.updateOne({
      password,
    });
    emailService({
      to: email,
      subject: "Speak Better: Password Changed Successfully",
      body: "sample text",
      templateId: PASSWORD_CHANGED_TEMPLATE_ID,
      data: {
        name: user.firstName,
        url: `${BASE_URL}/me/home`,
      },
    });
    return res.status(200).json(
      response({
        message: "Your password was reset successfully",
        success: true,
      })
    );
  } catch (error) {
    return res.status(500).json(
      response({
        message: "Something went wrong wile processing this request",
        success: false,
      })
    );
  }
};
