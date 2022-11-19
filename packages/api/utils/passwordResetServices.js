const{ userCollection: User} = require('../database/models/userSchema');
const { tokencollection: Token} = require('../database/models/recoveryToken');
const sendEmail = require('./sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { environment } = require('../config/environment')


const requestPasswordReset = async (email) => {
  try{
  //verify that user exists
    const user = await User.findOne({email});

    if (!user) throw  new Error("user doesn't exist");

    //check if a token was already generated
    let token =  Token.findOne({ userId: user._id });

    //if so we delete it
    if (token) {
        await token.deleteOne()
    }

    //generate a fresh token
    let resetToken = crypto.randomBytes(32).toString("hex");

    const hash = await bcrypt.hash(resetToken, 10);

    //we also instantiate a new token model in our db to verify reset confirmation.
    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now()
    }).save();

    const link = `${environment.HOST}:${environment.PORT}/auth/resetPassword?token=${resetToken}&userId=${user._id}`;
    await sendEmail(
      user.email, 
      "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./template/requestResetPassword.handlebars");

    return link;
  } catch (err) {
    console.error(err);
  }
} 



const resetPassword = async (userId, token, password) => {
  try{
    console.log(userId)
  //confirm that the user has a generated a reset token
    let passwordResetToken = await Token.findOne({userId: userId});

    console.log(passwordResetToken)

    if (!passwordResetToken) {
      throw new Error("Invalid password reset token");
    }
  
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
  
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
  
    const hash = await bcrypt.hash(password, 10);
  
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
  
    const user = await User.findById({ _id: userId });
  
    sendEmail(
      user.email,
     "Password reset",
     {
      name: user.name,
    },
    "./template/resetPassword.handlebars",
    );
  
    await passwordResetToken.deleteOne();
  
    return true;
    } catch (err) {
      console.error(err);
    }
  };
  
  module.exports = {
    requestPasswordReset,
    resetPassword,
  };