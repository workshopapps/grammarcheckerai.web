const app = require("../app");
const paystackController = require("../controller/paystackController");
paystack = require("express").Router();

paystack.get("/", paystackController.home);
paystack.get("/list", paystackController.fetchSubscription);
paystack.get("/subscribe", paystackController.subscribe);

module.exports = paystack;
