const jwt = require("jsonwebtoken");
const { environment } = require("../config/environment.js");
const { JWT_SECRET } =  environment;
// this is the auth middleware, in this module,
// we check if there is a token in the header of the request.
// if there is no token, it will exit the function.

function verify(req, res, next) {
   
  const token = req.header("Authorization")?.split(" ")[1];
  
  
  if (!token) return res.status(401).send("Access denied. No token Provided"); 
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

module.exports = verify;
