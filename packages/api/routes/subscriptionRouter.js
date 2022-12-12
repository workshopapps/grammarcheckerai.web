const express = require("express");
const subscriptionRouter = express.Router();
const { getAllSubscriptions } = require("../controller/subscriptionController");


subscriptionRouter.get("/", getAllSubscriptions);

module.exports = subscriptionRouter;