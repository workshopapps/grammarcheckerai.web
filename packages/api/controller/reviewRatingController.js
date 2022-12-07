const Rating = require("../database/models/reviewRatingSchema");
const { userCollection } = require("../database/models/userSchema");

exports.getRating = async (req, res) => {
  try {
    const response = await Rating.find().populate({
      path: "userid",
      select: "email username",
    });
    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
    });
  }
};

exports.reviewRating = async (req, res) => {
  try {
    const { comment, ratings, userid } = req.body;

    if (!ratings) {
      return res.status(400).json({
        success: false,
        message: "Missing Rating field, please add your rating",
      });
    }

    const user = await userCollection.findById(userid);
    let rating, username;
    if (user) {
      username = user.username;
      rating = await Rating.findOne({ userid });
    }

    let new_rating;
    if (rating) {
      rating.comment = comment ? comment : rating.comment;
      rating.ratings = ratings;
      new_rating = await rating.save({
        validateBeforeSave: true,
      });

      res.status(200);
    } else {
      new_rating = await Rating.create({
        comment,
        ratings,
        userid,
      });

      res.status(201);
    }

    return res.json({
      success: true,
      message: "rated successfully",
      username,
      new_rating,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
