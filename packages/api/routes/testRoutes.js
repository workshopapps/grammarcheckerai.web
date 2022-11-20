const app = require("../app");
const testController = require('../controller/testController')
test = require("express").Router();

test.get("/", testController.home);

module.exports = test;
