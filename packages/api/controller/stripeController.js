const { environment } = require("../config/environment");
const Subscription = require("../database/models/subscriptionSchema");
const { STRIPE_SECRET_KEY } = environment;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

exports.checkout = async (req, res, next) => {
  const { plan, interval, amount, currency, txref } = req.body;
  const { email } = req.user;

  //CHECK IF USER HAS ACTIVE SUBSCRIPTION
  const isActive = await Subscription.findOne({
    $and: [
      { email: email },
      { status: "success" },
      { paymentGateway: "stripe" },
    ],
  });
  var payload = { txref, plan, interval, amount, currency };
  payload.email = email;
  payload.subscriptionId = plan;

  if (isActive) {
    console.log(isActive);
    return res.status(200).send({
      success: true,
      message: `You have an Active Subscription with ID: ${isActive.txref}`,
      data: isActive,
    });
  }
  const session = await stripe.checkout.sessions
    .create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      metadata: { email: email, interval: interval, txref: txref },
      mode: "subscription",
      customer_email: email,
      client_reference_id: txref,
      success_url: `http://localhost:5000/premium?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://speakbetter.hng.tech`,
    })
    .then((data) => {
      return res.status(200).json({
        success: true,
        message: "subscription initiated",
        redirectUrl: data.url,
        session: data,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "There was an error",
        error: error.message,
      });
    });
};

exports.create = async (req, res) => {
  const { plan, interval, amount, currency, txref } = req.body;
  const { email } = req.user;
  const isActive = await Subscription.findOne({
    $and: [
      { email: email },
      { status: "success" },
      { paymentGateway: "stripe" },
    ],
  });
  var payload = { txref, plan, interval, amount, currency };
  payload.email = email;
  payload.subscriptionId = plan;

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

  await Subscription.create(payload).catch((error) => {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There was an error",
      error: error.message,
    });
  });
};

exports.cancel = async (req, res) => {
  const { txref } = req.body;
  const { email } = req.user;
  if (!email || !txref)
    return res.status(400).send({
      success: false,
      message: "Invalid reference sent",
    });
  const transaction = await Subscription.findOne({
    $and: [{ email: email }, { txref: txref }],
  });
  if (transaction == null) {
    return res.status(400).send({
      success: false,
      message: `0 Subscription found for User: ${email}!`,
      data: [],
    });
  }
  if (transaction.status == "cancelled")
    return res.status(200).send({
      success: false,
      message: "Subscription cancelled already!",
      data: transaction,
    });

  await stripe.subscriptions
    .del(transaction.subscriptionId)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Error encountered",
        error: error.message,
      });
    });

  await Subscription.findByIdAndUpdate(
    transaction._id,
    { status: "cancelled" },
    { new: true }
  )
    .then((data) => {
      return res.status(200).json({
        success: true,
        message: "Subscription Cancelled",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Error encountered",
        errorCode: err.code,
        error: err.message,
      });
    });
};

exports.verify = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId)
    return res
      .status(400)
      .json({ success: false, message: "No Session ID sent " });
  const verificationSession = await stripe.checkout.sessions
    .retrieve(sessionId)
    .then(async (data) => {
      const txref = data.client_reference_id;
      const currency = data.currency.toUpperCase();
      const amount = data.amount_total / 100;
      const { email } = req.user;
      const subscriptionId = data.subscription;
      const interval = data.metadata.interval;
      const paymentGateway = "stripe";
      const status = "successful";
      const payload = {
        email,
        txref,
        currency,
        amount,
        subscriptionId,
        interval,
        paymentGateway,
        status,
      };
      if (!subscriptionId)
        return res.status(400).send({
          success: false,
          message: "Payment not successful",
          session: data,
        });
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
      const isVerified = await Subscription.findOne({txref: txref})
      if(isVerified) {
        return res.status(400).json({
          success: false,
          message: `Subscription with reference: ${txref}, verified already`,
          data: payload,
        session: data,
        });
      }
      await Subscription.create(payload);
      return res.status(200).json({
        success: true,
        message: data.payment_status,
        data: payload,
        session: data,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "There was an error",
        error: error.message,
      });
    });
};
