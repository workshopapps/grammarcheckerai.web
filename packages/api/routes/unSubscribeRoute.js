const { Router } = require("express");
const {unSubscribe} = require("../controller/newsLetterSubscriptionController");
const unSubscribeRouter = Router();

unSubscribeRouter.post('/newsletter', unSubscribe)

module.exports = unSubscribeRouter;