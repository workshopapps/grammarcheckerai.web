const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controller/deleteUserController"); //importing deleteuser controller

router.route("/").delete(deleteUser);

module.exports = router;
