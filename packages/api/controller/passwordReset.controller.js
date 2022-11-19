const { requestPasswordReset, resetPassword } = require("../utils/passwordResetServices");
  
  
const resetPasswordReqController = async (req, res, next) => {
    const reqPassReset = await requestPasswordReset(
      req.body.email
    );
    return res.json(reqPassReset);
};
  
const resetPasswordController = async (req, res, next) => {
  console.log(req.query.userId)
    const resetPass = await resetPassword( req.query.userId, req.query.token, req.body.password);

    return res.json(resetPass);
};
  
  module.exports = {
    resetPasswordReqController,
    resetPasswordController,
  };