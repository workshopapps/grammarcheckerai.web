const app = require("../app");
const paystackController = require("../controller/paystackController");
paystack = require("express").Router();

paystack.get("/", paystackController.allSubscriptions);
paystack.post("/subscribe", paystackController.subscribe);
paystack.get("/verify/:ref", paystackController.verifyTransaction);


module.exports = paystack;
