const { Router } = require("express");
const {logout} = require("../controller/logoutcontroller")
const logoutRouter = Router();

logoutRouter.post("/", logout);

module.exports = logoutRouter;
