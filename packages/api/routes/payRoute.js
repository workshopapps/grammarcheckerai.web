const express = require("express");
const payRouter = express.Router();
const {flutPay} = require("../controller/flutterWave")
const {
  createPayment,
  getSubscription,
  checkActiveSubscription,
  verification,
  cancelSubscription,
} = require("../controller/payController");


payRouter.post("/create", createPayment);
payRouter.post("/checkActive", checkActiveSubscription);
payRouter.get("/verify", verification);
payRouter.post("/cancel", cancelSubscription);
payRouter.get("/", getSubscription);

module.exports = payRouter;

