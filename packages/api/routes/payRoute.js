const express = require("express");
const payRouter = express.Router();
const {
  createPayment,
  getSubscription,
  verification,
  cancelSubscription,
} = require("../controller/payController");

payRouter.post("/create", createPayment);
payRouter.get("/verify", verification);
payRouter.post("/cancel", cancelSubscription);
payRouter.get("/", getSubscription);

module.exports = payRouter;

