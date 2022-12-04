const express = require("express");
const payRouter = express.Router();
const { getUser } = require("../middlewares/UserRestriction/userAccessControl");
const {
  createPayment,
  getSubscription,
  cancelSubscription,
} = require("../controller/payController");

payRouter.post("/create", createPayment);
payRouter.post("/cancel", cancelSubscription);
payRouter.get("/", getSubscription);

module.exports = payRouter;
