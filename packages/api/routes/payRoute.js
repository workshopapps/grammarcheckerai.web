const express = require("express");
const payRouter = express.Router();
const {getUser} = require("../middlewares/UserRestriction/userAccessControl")
const {createPayment, getSubscription} = require("../controller/payController")

payRouter.post("/create", createPayment)
payRouter.get("/", getSubscription)

module.exports = payRouter;