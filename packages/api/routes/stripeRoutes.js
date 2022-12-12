const express = require("express");
const stripeRouter = express.Router();
const {  checkout, cancel, create, verify } = require("../controller/stripeController");

stripeRouter.post("/checkout", checkout);
stripeRouter.post("/create", create);
stripeRouter.post("/cancel", cancel);
stripeRouter.post("/verify", verify);



module.exports = stripeRouter;