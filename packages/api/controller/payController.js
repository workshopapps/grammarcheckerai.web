const Subscription = require("../database/models/subscriptionSchema");


const createPayment = async (req, res) => {
  let email = req.body.email;
  if (!email)
    return res.status(400).send({ success: false, message: "Invalid email" });
  try {
    const { user, email, subscriptionId, interval, amount, currency } =
      req.body;
    const payload = {
      user,
      email,
      subscriptionId,
      interval,
      amount,
      currency,
    };
    const result = await Subscription.create(payload);
    res.status(200).send({
      success: true,
      message: "Subscription created",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getSubscription = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email",
      });
    }
    if (email == undefined || email == null || email == "undefined") {
      return res.status(400).send({
        success: false,
        message: "Invalid Email",
      });
    }
    const user = await Subscription.find({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not subscribed",
        data: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const cancelSubscription = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).send({
      success: false,
      message: "Invalid email sent",
    });
  const user = await Subscription.findOne({ email });
  if (!user) {
    return res.status(400).send({
      success: false,
      message: `No subscription found for ${email}`,
      data: [],
    });
  }

  await Subscription.findByIdAndDelete(user._id)
    .then(() => {
      return res.status(200).send({
        success: true,
        message: "Subscription Cancelled",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        success: false,
        message: `Error: ${err.message}`,
      });
    });
};

module.exports = {
  createPayment,
  getSubscription,
  cancelSubscription,
};
