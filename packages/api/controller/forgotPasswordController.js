const { response } = require("../utilities/response");
const { register, findOne } = require("../repository/user.repository");
const { userCollection } = require("../database/models/userSchema.js");
const Email = require("../services/email.service");
const { generateToken, verifyJWTToken } = require("../utilities/generateToken");

exports.requestForgotPassword = async(req, res) => {
	const { email } = req.body;

	try {
		const checkEmailExist = await userCollection.findOne({ email });

	if (!checkEmailExist) {
		return res.status(409).json(response({ message: "Email does not exist", success: false }));
	}
    
	
	const token = generateToken({ email });

	const reset_password_url = `${process.env.MISC_URL}/reset_password?token=${token}`;
	const send_reset_email = new Email(
    email,
    firstName,
    "Welcome to Gritty Grammer",
    reset_password_url
  );

  await send_reset_email.send();
	return res.status(200).json(response({ message: 'A mail was just sent to this email address', success: true }));
	
	} catch (error) {
		return res.status(500).json(response({ message: "Something went wrong wile processing this request", success: false }));
	}
}

exports.resetPassword = async(req, res) => {
	const { new_password, confirm_password, user_token } = req.body;
	
	try {
		//Check if the user already exist
		if(new_password !== confirm_password) {
			res.status(422).json(response({	success: false,error: "Password mismatch", message: "Comfirm your password" })
			);
		}

		const decodeToken = await verifyJWTToken(user_token);
		if (!decodeToken) {
			return res.status(401).json(response({ message: "Invalid Token", success: false }));
		}

		const { email } = decodeToken;

		const checkEmailExist = await userCollection.findOne({ email });
		if (!checkEmailExist) {
			return res.status(409).json(response({ message: "User does not exist", success: false }));
		}

		await checkEmailExist.update({
			password: new_password,
			confirm_password
		})

		return res.status(200).json(response({ message: 'Your password was reset successfully', success: true }));
	} catch (error) {
		return res.status(500).json(response({ message: "Something went wrong wile processing this request", success: false }));
	}
}

