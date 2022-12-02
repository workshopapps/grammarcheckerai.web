const { userCollection } = require("../database/models/userSchema");
const newsLetterSubscription = require("../database/models/newsLetterSubscriptionSchema");

//query user collection
exports.isSubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const subscribed_user = await newsLetterSubscription.findOne({ email });
    if (subscribed_user) {
      res.status(200).json({
        status: true,
        message: "you already a subscriber, chill for our newsletters",
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
    res.status(200).json({
      status: true,
      message: "You are now subscribed to our newsletter",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "something went wrong while handling your request",
    });
  }
};
