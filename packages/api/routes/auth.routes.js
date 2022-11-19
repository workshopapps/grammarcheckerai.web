const { Router } = require("express");
const userRouter = Router();
const  {validate, registerValidationRules} = require("../utilities/validation/auth.validation");
const { registerUser, deleteUser } = require("../controller/auth/user.controller"); //importing deleteuser controller 
const { googleAuthURL } = require("../controller/auth/google.user.controller");


userRouter.post("/signup", registerValidationRules(), validate, registerUser);
userRouter.post("/google-auth",  googleAuthURL);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
