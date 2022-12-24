const app = require("../app");
const testController = require('../controller/testController')
test = require("express").Router();

test.get("/", testController.home);
test.post("/sendMail", testController.sendMail);

module.exports = test;


