const Flutterwave = require("flutterwave-node-v3");
require("dotenv").config();
const got = require("got");
const { response } = require("express");
const Subscription = require("../database/models/subscriptionSchema");
const emailService = require("../services/email.service");
const { environment } = require("../config/environment");
const {  FLW_PUBLIC_KEY, FLW_SECRET_KEY, BASE_URL, PREMIUM_TEMPLATE_ID } = environment;

const flw = new Flutterwave( FLW_PUBLIC_KEY,  FLW_SECRET_KEY);


const flutPay = async (req, res) => {
    let email = req.body.email;
  
    //VALIDATE USER REQUEST
    if (!email)
      return res.status(400).send({ success: false, message: "Invalid email" });
    try {
      const {  email, flw_re, interval, amount, currency, txref } =
        req.body;
      const payload = {
        email,
        subscriptionId: flw_re,
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

  const flutToken = "FLWSECK_TEST-d9bca844bd11eba144a5430ba30d687d-X";

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
      .get(`https://api.flutterwave.com/v3/transactions/${txref}`, {
        headers: {
          authorization: `Bearer ${lutToken}`,
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
  

  


const activateSubscription = async () => {
  try {
    const payload = {
        card_number: "4556052704172643",
        expiry_month: "01",
        expiry_year: "23",
        currency: "USD",
        amount: 4,
        email: "khayceesdike@gmail.com",
        phonenumber: "07032044217",
        fullname: "kelechi nwaji",
        tx_ref: "MC-3243f",
        redirect_url: "https://speakbetter.hng.tech",
        enckey: "FLWSECK_TESTb780896f15ad",
        customer: { email: "khayceesdike@gmail.com", phonenumber: "07032044217" },
        payment_plan: 31036,
        authorization: {
        mode: 'avs_noauth',
        city: "AMAC",
        address: "My Addess",
        state: "Abuja",
        country: "Nigeria",
        zipcode: 30001,
      },
    };
    const response = await flw.CheckOut.card(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    flutPay,
    verification
  };

