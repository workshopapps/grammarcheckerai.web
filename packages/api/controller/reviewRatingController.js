const Rating = require('../database/models/reviewRatingSchema')

exports.getRating = async (req, res) => {
    try {
        const { conversation_id } = req.params;

        const response = await Rating.findOne({ conversation_id })

        return res
            .status(200)
            .json({
                success: true,
                response
            })
    } catch (error) {
        return res.status(400).json({
            success: false
        })
    }
}

exports.reviewRating = async (req, res) => {
    try {
        const { comment, conversation_id, ratings, userid } = req.body;

        if (!ratings || !conversation_id || !userid) {
            return res.status(400).json({
                success: false,
                message: 'Missing field'
            })
        }
        const new_rating = await Rating.create({ comment, conversation_id, ratings, userid })
        
        if (!new_rating) {
            return res.status(400).json({
                success: false,
                message: 'Rating Unsuccessful'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'rated successfully'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}