const jwt = require('jsonwebtoken');

// this is the auth middleware, in this module,
// we check if there is a token in the header of the request.
// if there is no token, it will exit the function.

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token Provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
        
    }

    catch(ex) {
        res.status(400).send('invalid token');
    }
}

module.exports = auth;