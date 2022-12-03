const userCollection = require("../database/models/userSchema")
const Subscription = require("../database/models/subscriptionSchema");

const createPayment = async (req, res) => {
    let user = req.user;
    let userId = user?._id;
    try {
      const { email, subscriptionId, interval, amount, currency} = req.body;
      const payload ={email, subscriptionId, interval, amount, currency, user:userId}
      const result = await Subscription.create(payload)
      res.status(200).send({
        success: true,
        message: "Subscription created",
        data: result
      })
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


const getSubscription  = async (req, res) =>{
 try {
  const {email} = req.body;
  const user = await Subscription.findOne({email});
  if (!user) {
    return res.status(404).send({
        success: false,
        message: 'User Not Found',
        data: {},
      }
    );
  }
  return res.status(200).send({
      success: true,
      message: 'User found',
      data: user,
    })
 } catch (error) {
  return res.status(400).json({
      success: false,
      message: 'An Error Occured',
      data: {
        error,
      },
    }
  );
 }
}

  module.exports = {createPayment, getSubscription};