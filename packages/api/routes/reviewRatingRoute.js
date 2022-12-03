const router = require('express').Router()
const { reviewRating, getRating } = require('../controller/reviewRatingController')

router.route('/:conversation_id').get(getRating)

router.route('/').post(reviewRating)

module.exports = router;