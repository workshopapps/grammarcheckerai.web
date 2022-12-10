const express = require("express");
const stripeRouter = express.Router();
const {  checkout, cancel, get, create } = require("../controller/stripeController");

stripeRouter.post("/checkout", checkout);
stripeRouter.post("/create", create);
stripeRouter.post("/cancel", cancel);
stripeRouter.get("/", get);



module.exports = stripeRouter;