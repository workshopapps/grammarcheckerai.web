const routeHandler = require('express').Router()
const {userHandler} = require('../routes/user.routes')
const {auth} = require('../routes/auth.routes')

routeHandler.use('/auth', auth);
routeHandler.use('/user', userHandler);


module.exports = {routeHandler}