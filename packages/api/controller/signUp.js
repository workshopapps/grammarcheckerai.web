const user = require('../database/models/userSchema');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
  const { name, displayName, password, confirmPassword, email } = req.body;

  const handleErrors = (mgs) => {
    return res.status(400).json({
      success: false,
      mgs: mgs,
    });
  };

  // check if email is valid
  const emailValid = user.authValidatorSchema.validate({ email: email });
  if (emailValid.error) {
    return handleErrors('invalid email address!');
  }

  //   check if conPassword and password is same
  if (confirmPassword !== password) {
    return handleErrors('Password does not match!');
  }
  //   hashing password
  let hashedPassword = await bcrypt.hash(password, 8);
  // console.log(hashedPassword);
  try {
    //   check if user is exist
    const checkUser = await user.userCollection.findOne({ email });
    console.log(checkUser);
    if (checkUser) {
      return handleErrors('User already registed!');
    }
    // create a new user
    const newUser = await user.userCollection.create({
      name,
      displayName,
      email: emailValid.value.email,
      password: hashedPassword,
    });
  } catch (err) {
    return handleErrors(err.message);
  }

  return res.status(200).json({
    success: true,
    mgs: 'User Registed successfully',
  });
};

module.exports = signUp;
