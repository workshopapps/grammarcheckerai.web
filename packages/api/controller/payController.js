const Subscription = require("../database/models/subscriptionSchema");
const emailService = require("../services/email.service");
const axios = require("axios");
const { environment } = require("../config/environment");
const { PAYSTACK_SECRET_KEY, BASE_URL, PREMIUM_TEMPLATE_ID } = environment;

const createPayment = async (req, res) => {
  const { email } = req.user;

  try {
    const { subscriptionId, interval, amount, currency, txref } = req.body;
    const paymentGateway = "paystack";
    const payload = {
      email,
      subscriptionId,
      interval,
      amount,
      currency,
      txref,
      paymentGateway
    };

    //FIND ACTIVE SUBSCRIPTION
    const isActive = await Subscription.findOne({
      $and: [
        { email: email },
        { status: "success" },
        { paymentGateway: "paystack" },
      ],
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
    if (interval == "weekly") expirationDate = expirationDate.addDays(7);
    payload.expirationDate = expirationDate;
    if (interval == "monthly") expirationDate = expirationDate.addDays(30);
    payload.expirationDate = expirationDate;
    if (interval == "quarterly") expirationDate = expirationDate.addDays(90);
    payload.expirationDate = expirationDate;
    if (interval == "annually") expirationDate = expirationDate.addDays(365);
    payload.expirationDate = expirationDate;

    //SAVE TO DATABASE
    const result = await Subscription.create(payload);

    //SEND EMAIL TO USER
    await emailService({
      to: email,
      templateId: PREMIUM_TEMPLATE_ID,
      dynamic_template_data: { actionurl: BASE_URL },
    });
    res.status(200).send({
      success: true,
      message:
        "You have successfully subscribed for our premium packages on SpeakBetter",
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


const cancelSubscription = async (req, res) => {
  const { txref } = req.body;
  const { email } = req.user;
  if (!txref)
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

  await Subscription.findByIdAndUpdate(
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
  const { txref } = req.query;
  const { email } = req.user;
  if (!txref)
    return res
      .status(400)
      .send({ success: false, message: "Invalid Reference ID" });
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
      await Subscription.findByIdAndUpdate(
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



module.exports = {
  createPayment,
  verification,
  cancelSubscription,
};
