const userCollection = require("../database/models/userSchema");
const Subscription = require("../database/models/subscriptionSchema");

const createPayment = async (req, res) => {
  let user = req.user;
  let userId = user._id;
  try {
    const { email, subscriptionId, interval, amount, currency } = req.body;
    const payload = {
      email,
      subscriptionId,
      interval,
      amount,
      currency,
      user: userId,
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
      message: "An Error Occured",
    });
  }
};

const getSubscription = async (req, res) => {
  try {
    const  {email} = req.query;
    if (!email)return res.status(400).send({
      success: false,
      message: "Empty Request",
    }); 
    const user = await Subscription.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "An Error Occured",
    });
  }
};

module.exports = { createPayment, getSubscription };
