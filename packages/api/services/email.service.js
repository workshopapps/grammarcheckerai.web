const sgMail = require("@sendgrid/mail");
const { environment } = require("../config/environment.js");
const { SENDGRID_API_KEY, BASE_URL } = environment;

const welcome = require("../utilities/email");
sgMail.setApiKey(SENDGRID_API_KEY);

const emailService = async ({ to, from = 'akan.otong@pmt.ng', subject, body, templateId, data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if(process.env.NODE_ENV === "production"){
      const response = await sendgrid.send({
        from: `Gritty Grammer <${from}>`,
        to,
        text: body,
        subject,
        templateId,
        dynamicTemplateData: data
      });

      resolve(true)
    } catch (err) { 
      resolve(false)
    }
  })
};

module.exports = emailService;