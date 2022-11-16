const express = require("express");
const router = express.Router()

//welcome note
router.get('/', (req, res)=>{
    res.status(200).json({
        pageTitle: "Home",
        message : "Welcome to Grit Grammarly 🙌"
        });
})

module.exports = router;