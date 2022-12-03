const { environment } = require("../config/environment");
const Subscription = require("../database/models/subscriptionSchema");
const userShema = require("../database/models/userSchema")
const https = require("https");
const { PAYSTACK_SECRET_KEY } = environment;
const express = require('express')
const paystack = express.Router();
const { initializePayment, verifyPayment } = require("./paystack")(request);

exports.allSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find();
  return res.status(200).send({ status: "ok", data: subscriptions });
};

paystack.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return;
       }
       response = JSON.parse(body);
       res.redirect(response.data.authorization_url)
    });
});


const createPayment = async (req, res) => {
  let user = req.user;
  let userId = user?._id;
  try {
    const { email, subscriptionId, interval, amount, currency} = req.body;
    const payload ={email, subscriptionId, interval, amount, currency, user:userId}
    findUser = await userShema.findOne({ email });
    if(!findUser){
      return res.status(404).JSON({
        success: false,
        message: "Please create an Account"
      })
    }
    const result = await Subscription.create(payload)
  } catch (error) {
    return res.status(400).json(
      response({
        success: false,
        message: 'An Error Occured',
        data: {
          error,
        },
      })
    );
  }
}