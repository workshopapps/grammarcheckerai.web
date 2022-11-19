const routeHandler = require('express').Router()
const {userHandler} = require('../routes/user.routes')
const {auth} = require('../routes/auth.routes');
const conversationRouter = require('./conversationRouter');


routeHandler.use('/auth', auth);
routeHandler.use('/user', userHandler);
routeHandler.use('/conversation', conversationRouter);


module.exports = {routeHandler}