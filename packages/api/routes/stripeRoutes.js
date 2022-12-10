const express = require("express");
const stripeRouter = express.Router();
const {  checkout, cancelSubscription } = require("../controller/stripeController");

stripeRouter.post("/create", checkout);
stripeRouter.post("/cancel", cancelSubscription);


module.exports = stripeRouter;