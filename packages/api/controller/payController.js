const Subscription = require("../database/models/subscriptionSchema");
const axios = require("axios");
const { environment } = require("../config/environment");
const { PAYSTACK_SECRET_KEY } = environment;

const createPayment = async (req, res) => {
  let email = req.body.email;
  if (!email)
    return res.status(400).send({ success: false, message: "Invalid email" });
  try {
    const { user, email, subscriptionId, interval, amount, currency, txref } =
      req.body;
    const payload = {
      user,
      email,
      subscriptionId,
      interval,
      amount,
      currency,
      txref,
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
    const user = await Subscription.findOne({ email });
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
  const { email, txref } = req.body;
  if (!email || !txref)
    return res.status(400).send({
      success: false,
      message: "Invalid email or reference sent",
    });
  const transaction = await Subscription.findOne({
    $and: [{ email: email }, { txref: txref }],
  });
  if (!transaction) {
    return res.status(400).send({
      success: false,
      message: `No subscription found for ${email}`,
      data: [],
    });
  }

  const cancel = await Subscription.findByIdAndUpdate(
    transaction._id,
    { status: "cancelled" },
    { new: true }
  )
    .then((cancel) => {
      return res.status(200).send({
        success: true,
        message: "Subscription Cancelled",
        data: cancel
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

const verification = async (req, res) => {
  const { txref, email } = req.body;
  let isVerified;
  if (!txref || !email)
    return res
      .status(400)
      .send({ success: false, message: "Invalid Reference" });
  const verifiedTx = await Subscription.findOne({
    $and: [{ email: email }, { txref: txref }],
  });
  await axios
    .get(`https://api.paystack.co/transaction/verify/${txref}`, {
      headers: {
        authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
    .then(async (success) => {
      isVerified = await Subscription.findByIdAndUpdate(
        verifiedTx._id,
        { status: success.data.data.status },
        { new: true }
      );
      return res.status(200).send(success.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send(error.message);
    });
  console.log(isVerified);
};

module.exports = {
  createPayment,
  verification,
  getSubscription,
  cancelSubscription,
};
