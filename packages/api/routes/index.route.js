const routeHandler = require("express").Router();
const { userHandler } = require("../routes/user.routes.js");
const { auth } = require("../routes/auth.routes");
const conversationRouter = require("./conversationRouter");

<<<<<<< HEAD
<<<<<<< HEAD
const verify = require("../middlewares/authMiddleware");
=======
const verify = require("../middlewares/auth.middleware");
>>>>>>> fd83e46af3400de4bf25f77d15bbf087dedb374e
=======
const verify = require("../middlewares/auth.middleware");
>>>>>>> 3a0e6aee8c2509ac4c6b148fef1bf44f17448529

routeHandler.use('/auth', auth);
routeHandler.use('/user', verify, userHandler);
routeHandler.use('/conversation', conversationRouter);

module.exports = { routeHandler };
