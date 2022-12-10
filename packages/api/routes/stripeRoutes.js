const express = require("express");
const stripeRouter = express.Router();
const {  checkout, cancel } = require("../controller/stripeController");

stripeRouter.post("/create", checkout);
stripeRouter.post("/cancel", cancel);


module.exports = stripeRouter;