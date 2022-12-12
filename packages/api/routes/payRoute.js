const express = require("express");
const payRouter = express.Router();
const {flutPay} = require("../controller/flutterWave")
const {
  createPayment,
  verification,
  cancelSubscription,
} = require("../controller/payController");


payRouter.post("/create", createPayment);
payRouter.get("/verify", verification);
payRouter.post("/cancel", cancelSubscription);

module.exports = payRouter;

