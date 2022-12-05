const routeHandler = require("express").Router();
const { userHandler } = require("../routes/user.routes.js");
const { auth } = require("../routes/auth.routes");
const conversationRouter = require("./conversationRouter");
const testRoute = require("./testRoutes");
const quizRoute = require("./quizRoutes");
const contactRoute = require("./contactRoutes");
const verify = require("../middlewares/auth.middleware");
const quickTranscribe = require("./quickTranscribeRouter");
const newsletter = require("../routes/newsLetterRoute");
const reviewRating = require("../routes/reviewRatingRoute");
const leaderBoardRouter = require("../routes/leaderboardrouter");
const paystackRouter = require("./paystackRouter");
const chatHistoryRouter = require("./chatHistory");
const payRoute = require("../routes/payRoute");
const newsletterSubscription = require("../routes/newsLetterSubscriptionRoute");

routeHandler.use("/subscribe", payRoute);
routeHandler.use("/auth", auth);
routeHandler.use("/user", verify, userHandler);
routeHandler.use("/conversation", conversationRouter);
routeHandler.use("/test", testRoute);
routeHandler.use("/quiz", quizRoute);
routeHandler.use("/quickTranscribe", quickTranscribe);
routeHandler.use("/contact", contactRoute);
routeHandler.use("/newsletter", newsletter);

routeHandler.use("/rating", reviewRating);

routeHandler.use("/leaderboard", leaderBoardRouter);
routeHandler.use("/paystack", paystackRouter);
routeHandler.use("/chathistory", chatHistoryRouter);

routeHandler.use("/subscribe", newsletterSubscription);

module.exports = { routeHandler };
