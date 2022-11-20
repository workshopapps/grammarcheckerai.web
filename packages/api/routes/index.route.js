const routeHandler = require("express").Router();
const { userHandler } = require("../routes/user.routes.js");
const { auth } = require("../routes/auth.routes");
const conversationRouter = require("./conversationRouter");

const verify = require("../middlewares/authMiddleware");

routeHandler.use('/auth', auth);
routeHandler.use('/user', verify, userHandler);
routeHandler.use('/conversation', conversationRouter);

module.exports = { routeHandler };
