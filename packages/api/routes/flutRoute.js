const express = require("express");
const flutRouter = express.Router();
const {flutPay, verification, getSubscription} = require("../controller/flutterWave")


flutRouter.post("/create-pay", flutPay);
flutRouter.get("/verify", verification);
flutRouter.get("/fetch", getSubscription);

module.exports = flutRouter;