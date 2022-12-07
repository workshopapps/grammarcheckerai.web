const { userCollection } = require("../database/models/userSchema");
const newsLetterSubscription = require("../database/models/newsLetterSubscriptionSchema");
const newsLetterService = require("../services/newsletter");

//query user collection
exports.isSubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const subscribed_user = await newsLetterSubscription.findOne({ email });
    if (subscribed_user) {
      res.status(200).json({
        success: false,
        message: "You have already subscribed",
      });
    }
    const user_exist = await userCollection.findOne({ email });
    let user_id;
    if (user_exist) {
      user_id = user_exist._id;
    }
    await newsLetterSubscription.create({
      email,
      user_id: user_id || null,
    });
    await newsLetterService.send(email);
    res.status(200).json({
      success: true,
      message: "You are now subscribed to our newsletter",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something went wrong while handling your request",
      errorCode: error.code,
      error: error.message,
    });
  }
};
