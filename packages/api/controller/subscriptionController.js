const Subscription = require("../database/models/subscriptionSchema");

exports.getAllSubscriptions = async (req, res) => {
    try {
      const { email } = req.user;
      const userSub = await Subscription.find({ email });
      if (!userSub) {
        return res.status(400).send({
          success: false,
          message: `${userSub.length} Subscription(s) found for User: ${email}!`,
          data: [],
        });
      }
      return res.status(200).send({
        success: true,
        message: `${userSub.length} Subscription(s) found for User: ${email}!`,
        data: userSub,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error encountered",
        errorCode: error.statusCcode,
        error: error.message,
      });
    }
  };