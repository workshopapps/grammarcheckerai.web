const { Router } = require("express");
const {isSubscribe} = require("../controller/newsLetterSubscriptionController");
const newsletterRouter = Router();

newsletterRouter.post('/newsletter/confirm', isSubscribe)

module.exports = newsletterRouter;