const { body, check, validationResult } = require("express-validator");
const { response } = require("../../utilities/response");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const resultErrors = [];
  errors.array().map((err) => resultErrors.push({ [err.param]: err.msg }));

  const errorObject = Object.assign({}, ...resultErrors);
  return res
    .status(422)
    .json(
      response({
        success: false,
        message: "Action unsuccessful",
        error: "Validation failed",
        data: errorObject,
      })
    );
};
/**
 * It checks if the payload contains only the fields that are allowed
 * @param payload - the data you want to check
 * @param fields - an array of allowed fields
 * @returns true
 */
 const checkAllowedFields = (payload, fields) => {
  payload = Array.isArray(payload) ? payload : [payload];

  payload.forEach((item) => {
    const allowed = Object.keys(item).every(field => fields.includes(field));
    fields = typeof fields === 'string' ? fields : fields.join(', ');

    if (!allowed) {
      throw new Error(`Wrong fields passed. Allowed fields: ${fields}`);
    }
  });

  return true;
}

const registerValidationRules = () => {
  return [
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
    check("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name can not be empty")
      .isLength({ min: 1, max: 20 })
      .withMessage("First name  must be between 1 and 20 characters"),

    check("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name can not be empty")
      .isLength({ min: 1, max: 20 })
      .withMessage("Last name  must be between 1 and 20 characters"),
    check("username")
      .trim()
      .notEmpty()
      .withMessage("username can not be empty")
      .isLength({ min: 1, max: 20 })
      .withMessage("username  must be between 1 and 20 characters"),
    check("language")
      .trim()
      .notEmpty()
      .withMessage("language can not be empty")
      .isLength({ min: 2, max: 20 })
      .withMessage("language  must be between 1 and 20 characters"),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
    check("confirm_password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
  ];
};

const loginValidationRules = () => {
  return [
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
  ];
};
const otpValidationRules = () => {
  return [
    body("code")
      .isLength({ min: 6 })
      .isNumeric()
      .withMessage("code must be at least 6 character long"),
  ];
};
const emailValidationRules = () => {
  return [
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
  ];
};


const reset_password = [
	body("new_password")
		.exists()
		.withMessage('New password is required')
		.trim()
		.notEmpty()
		.withMessage("Password can not be empty")
		.isLength({ min: 6, max: 16 })
		.withMessage("Password must be between 6 and 16 characters"),
  body("confirm_password")
		.exists()
		.withMessage('Confirm password is required')
		.trim()
		.notEmpty()
		.withMessage("Password can not be empty")
		.isLength({ min: 6, max: 16 })
		.withMessage("Password must be between 6 and 16 characters"),
	body("user_token")
		.exists()
		.withMessage('user token is required')
		.isString()
		.withMessage('User token must be a string')
		.notEmpty()
		.withMessage("User token can not be empty"),
	body()
		.custom(body => checkAllowedFields(body, ['new_password','confirm_passowrd', 'user_token']))
]

const request_reset_password = [
	body("email")
		.exists()
		.withMessage('Email is required')
		.trim()
		.notEmpty()
		.withMessage("Email can not be empty")
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage("please enter a valid email"),
	body()
		.custom(body => checkAllowedFields(body, 'email'))
]


module.exports = {
  validate,
  registerValidationRules,
  loginValidationRules,
	request_reset_password,
	reset_password
};
