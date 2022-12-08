const Subscription = require("../database/models/subscriptionSchema");
const axios = require("axios");
const { environment } = require("../config/environment");
const { PAYSTACK_SECRET_KEY } = environment;

const createPayment = async (req, res) => {
  let email = req.body.email;

  //VALIDATE USER REQUEST
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

    //FIND ACTIVE SUBSCRIPTION
    const isActive = await Subscription.findOne({
      $and: [{ email: email }, { status: "success" }],
    });
    if (isActive) {
      console.log(isActive);
      return res.status(200).send({
        success: true,
        message: `You have an Active Subscription with ID: ${isActive.txref}`,
        data: isActive,
      });
    }

//CHECK EXPIRATION DATE
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    var expirationDate = new Date();
    if (interval == "weekly")
      expirationDate = expirationDate.addDays(7);
    payload.expirationDate = expirationDate;
    if (interval == "monthly")
      expirationDate = expirationDate.addDays(30);
    payload.expirationDate = expirationDate;
    if (interval == "quarterly")
      expirationDate = expirationDate.addDays(90);
    payload.expirationDate = expirationDate;
    if (interval == "annually")
      expirationDate = expirationDate.addDays(365);
    payload.expirationDate = expirationDate;


    //SAVE TO DATABASE
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
      message: `There was an error while carrying out this request`,
      error: error.message,
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
        message: `${user.length} Subscription(s) found for User: ${email}!`,
        data: [],
      });
    }
    return res.status(200).send({
      success: true,
      message: `${user.length} Subscription(s) found for User: ${email}!`,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error encountered",
      errorCode: error.code,
      error: error.message,
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
      message: `${transaction.length} Subscription(s) found for User: ${email}!`,
      data: [],
    });
  }
  if (transaction.status == "cancelled")
    return res.status(200).send({
      success: false,
      message: "Subscription cancelled already!",
      data: transaction,
    });

  const cancel = await Subscription.findByIdAndUpdate(
    transaction._id,
    { status: "cancelled" },
    { new: true }
  )
    .then((data) => {
      return res.status(200).send({
        success: true,
        message: "Subscription Cancelled",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        success: false,
        message: "Error encountered",
        errorCode: err.code,
        error: err.message,
      });
    });
};

const verification = async (req, res) => {
  const { txref, email } = req.query;
  let isVerified;
  if (!txref || !email)
    return res
      .status(400)
      .send({ success: false, message: "Invalid Reference or Email" });
  const verifiedTx = await Subscription.findOne({
    $and: [{ email: email }, { txref: txref }],
  });
  if (!verifiedTx)
    return res.status(400).send({
      success: false,
      message: `No transaction for this ID: ${txref}`,
    });
  if (verifiedTx.status == "success")
    return res.status(200).send({
      success: true,
      message: `Transaction with ID: ${txref} verified already`,
      data: verifiedTx,
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
      return res.status(200).send({
        success: true,
        message: "Verfied successfully",
        data: success.data,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error Encountered",
        errrorCode: error.code,
        error: error.message,
      });
    });
};

const checkActiveSubscription = async (req, res) => {};

module.exports = {
  createPayment,
  verification,
  getSubscription,
  checkActiveSubscription,
  cancelSubscription,
};
