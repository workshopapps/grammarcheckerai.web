const { response } = require("../utilities/response");
const { userCollection } = require("../database/models/userSchema");
const { environment } = require("../config/environment.js");
const { generateToken, verifyJWTToken } = require("../utilities/generateToken");
const emailService = require("../services/email.service");
const dynamicTemplates = require("../utilities/dynamicTemplates");
const bcrypt = require('bcryptjs');
const { BASE_URL } = environment;

exports.requestForgotPassword = async(req, res) => {
	const { email } = req.body;

	try {
		const user = await userCollection.findOne({ email });

	if (!user) {
		return res.status(409).json(response({ message: "Email does not exist", success: false }));
	}

	const token = generateToken({ email });
	const reset_password_url = `${BASE_URL}reset_password?token=${token}`;

	await emailService({
		to: email,
		from: 'noreply@sycamore.ng',
		subject: 'Password Reset',
		templateId: dynamicTemplates.RESET_PASSWORD,
		data: {
			name: user.firstName,
			action_url: reset_password_url
		},
	});

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

		const salt = await bcrypt.genSalt(10);
		await checkEmailExist.updateOne({
			password: await bcrypt.hash(new_password, salt)
		})

		return res.status(200).json(response({ message: 'Your password was reset successfully', success: true }));
	} catch (error) {
		return res.status(500).json(response({ message: "Something went wrong wile processing this request", success: false }));
	}
}

