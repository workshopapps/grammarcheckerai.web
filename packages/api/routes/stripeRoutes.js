const express = require("express");
const stripeRouter = express.Router();
const {  checkout, cancel, get, create, verify } = require("../controller/stripeController");

stripeRouter.post("/checkout", checkout);
stripeRouter.post("/create", create);
stripeRouter.post("/cancel", cancel);
stripeRouter.post("/verify", verify);
stripeRouter.get("/", get);



module.exports = stripeRouter;