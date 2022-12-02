const { environment } = require("../config/environment");
const Subscription = require("../database/models/subscriptionSchema");
const https = require("https");
const { PAYSTACK_SECRET_KEY } = environment;
const paystack = require("paystack")(PAYSTACK_SECRET_KEY);
const axios = require('axios')

exports.allSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find();
  return res.status(200).send({ status: "ok", data: subscriptions });
};

exports.subscribe = async (req, res) => {
  const { user, name, amount, interval, subscriptionId } = req.body;
  req.body.paymentGateway = "paystack";

  const params = JSON.stringify({
    customer: name,
    plan: "PLN_2cqf3nx11trbn4b",
    send_invoices: true,
    amount: amount,
   // redirect_url: "https://paystack.com/pay/1ka-cpvjd7",
  });
  const activeSubscription = await Subscription.findOne({ userId: user })
    .then((result) => {
      if (result != null)
        return res
          .status(400)
          .send({ success: false, message: "User already subscribed" });
    })
    .catch((error) => {
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    });
  if (!activeSubscription) {
    await Subscription.create(req.body);
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const request = https
      .request(options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          return data;
        });
      })
      .on("error", (error) => {
        console.error(error);
      });

    request.write(params);
    request.end();
    return res.status(200).send(request);
  }
};


exports.verifyTransaction = async(req,res)=>{
  const ref = req.params.ref
  
  const options ={
    hostname: "api.paystack.co",
    port: 443,
    path: `https://api.paystack.co/transaction/verify/${ref}`,
    method: "GET",
    headers: {
     
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
    },
  }

  const request = https.request(options, (res)=>{
    let data = "";

    res.on("data", (chunk)=>{
      data += chunk;
    });

    res.on("end", ()=>{
      console.log(JSON.parse(data));
    });
  })
  .on("error", (error)=>{
    console.log(error);
  });
  return res.status(200).send(request)
}