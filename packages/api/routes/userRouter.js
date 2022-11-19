const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controller/userController"); //importing deleteuser controller

router.route("/delete_user").delete(deleteUser);

module.exports = router;
