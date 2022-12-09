const router = require("express").Router();
const {
  reviewRating,
  getRating,
} = require("../controller/reviewRatingController");

router.route("/").get(getRating);

router.route("/").post(reviewRating);

module.exports = router;
