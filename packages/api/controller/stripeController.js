const axios = require("./axios");
const { environment } = require("../config/environment");
const Subscription = require("../database/models/subscriptionSchema");
const { STRIPE_SECRET_KEY, JWT_SECRET } = environment;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.Checkout = async (req, res, next) => {
const { plan, interval, amount, price, currency, txref, token } =req.body;
;
//CHECK IF TOKEN IS PRESENT
    if (!token) {
      return res.status(401).json({success: false, message:'You are not Logged in, Please Login to view this page'})
    }

//CHECK IF TOKEN IS VALID
  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
  if(!decoded) return res.status(401).json({success: false, message:'Token expired! Please log in again'})

  //CHECK IF USER HAS ACTIVE SUBSCRIPTION
  const isActive = await Subscription.findOne({
    $and: [{ email: decoded.email }, { status: "success" }, {paymentGateway: "stripe"}],
  });
  var payload = {txref, plan, interval, amount, currency}
    payload.email = decoded.email;
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

  await Subscription.create(payload).catch(error =>{
    console.log(error);
    return res.status(400).json({success: false, message: "There was an error", error: error.message})
  })
  const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: plan,
          quantity: 1,
  
        },
      ],
      mode: 'subscription',
      customer_email: decoded.email,
      client_reference_id: txref,
      success_url: `https://speakbetter.hng.tech/me/home?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://speakbetter.hng.tech`,
    }).then(data => {
      return res.status(200).json({success: true, message: "subscription initiated", 
      redirectUrl: data.url, session: data});
    }).catch(error => {
      console.log(error)
      return res.status(400).json({success: false, message: "There was an error", error: error.message})
    });
     
}



