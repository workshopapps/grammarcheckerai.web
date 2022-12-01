const { environment } = require("../config/environment");
const Subscription = require("../database/models/subscriptionSchema");

const { PAYSTACK_SECRET_KEY } = environment;
const paystack = require("paystack")(PAYSTACK_SECRET_KEY);

exports.home = async (req, res) => {
  return res.status(200).send({ status: "ok", message: "Hello Paystack" });
};

exports.fetchSubscription = async (req, res) => {
  paystack.customer
    .list()
    .then(function (body) {
      return res.status(200).send(body.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.subscribe = async (req, res) => {};
