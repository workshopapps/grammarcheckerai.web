const routeHandler = require('express').Router();
const { userHandler } = require('../routes/user.routes.js');
const { auth } = require('../routes/auth.routes');
const conversationRouter = require('./conversationRouter');

const verify = require('../middlewares/auth.middleware');

routeHandler.use('/auth', auth);
routeHandler.use('/user', userHandler);
routeHandler.use('/conversation', conversationRouter);

module.exports = { routeHandler };
