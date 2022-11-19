const { resetPasswordReqController, resetPasswordController } = require("../controller/passwordReset.controller");
  
const router = require("express").Router();
  
 
router.post("/request-reset-password", resetPasswordReqController);
router.post("/resetPassword", resetPasswordController);
  

module.exports = router;