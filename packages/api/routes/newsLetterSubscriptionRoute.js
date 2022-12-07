const { Router } = require("express");
const {isSubscribe} = require("../controller/newsLetterSubscriptionController");
const isSubscribeRouter = Router();

isSubscribeRouter.post('/newsletter/confirm', isSubscribe)

module.exports = isSubscribeRouter;

