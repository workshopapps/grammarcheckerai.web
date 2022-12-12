const express = require("express");
const flutRouter = express.Router();
const {flutPay, verification} = require("../controller/flutterWave")


flutRouter.post("/create-pay", flutPay);
flutRouter.get("/verify", verification);

module.exports = flutRouter;