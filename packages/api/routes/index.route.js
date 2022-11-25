const routeHandler = require('express').Router();
const { userHandler } = require('../routes/user.routes.js');
const { auth } = require('../routes/auth.routes');
const conversationRouter = require('./conversationRouter');
const testRoute = require('./testRoutes');
const quizRoute = require('./quizRoutes');
const quickTranscribe = require('./quickTranscribeRouter');

const verify = require('../middlewares/auth.middleware');

routeHandler.use('/auth', auth);
routeHandler.use('/user', verify, userHandler);
routeHandler.use('/conversation', conversationRouter);
routeHandler.use('/quickTranscribe', quickTranscribe);
routeHandler.use('/test', testRoute);
routeHandler.use('/quiz', quizRoute);
module.exports = { routeHandler };
