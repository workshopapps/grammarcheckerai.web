const newsLetterSubscription = require("../database/models/newsLetterSubscriptionSchema");
const emailService =require("../services/email.service")
const { environment } = require("../config/environment.js");
const { NEWSLETTER_TEMPLATE_ID, BASE_URL, UNSUBSCRIBED_TEMPLATE_ID} = environment

//newsletterSubscription
exports.isSubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const subscribed_user = await newsLetterSubscription.findOne({ email });
    if (subscribed_user) {
      return res.status(200).json({
        success: false,
        message: "You have already subscribed",
      });
    }
    await newsLetterSubscription.create({
      email,
    })
    
    await emailService({
      to: {email},
        templateId: NEWSLETTER_TEMPLATE_ID,
        dynamic_template_data:  {actionurl:BASE_URL},
    })
return res.status(200).json({
      success: true,
      message: "Thank you for subscribing",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something went wrong while handling your request",
      errorCode: error.code,
      error: error.message,
    });
  }
};

//unsubscribe as a user
exports.unSubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const subscribed_user = await newsLetterSubscription.findOne({ email });
    if (!subscribed_user) {
      return res.status(200).json({
        success: false,
        message: "You are not a subscriber",
      });
    }
    if(!subscribed_user.subscription){
      return res.status(400).json({
        message: "You are already unsubscribed from receiving news letter"
      })
    }
    await newsLetterSubscription.findOneAndUpdate(
      subscribed_user.email,
      {
        subscription: false
      }
    ); 
    

    //email service 
    await emailService({
      to: {email},
        templateId: UNSUBSCRIBED_TEMPLATE_ID,
        dynamic_template_data: {actionurl: `${BASE_URL}/unsubscribe`},
    })
    await newsLetterSubscription.findOneAndDelete({
      email,
    });
    res.status(200).json({
      success: true,
      message:"You have unsubscribed succesfully"
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something went wrong while handling your request",
      errorCode: error.code,
      error: error.message,
    });
  }
};
