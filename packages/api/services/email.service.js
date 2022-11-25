const sendgrid = require("@sendgrid/mail");
const { environment } = require("../config/environment.js");
const { SENDGRID_API_KEY } = environment;
const welcome = require("../utilities/email");
sendgrid.setApiKey(SENDGRID_API_KEY);

const emailService = async ({ to, from = 'akan.otong@pmt.ng', subject, body, templateId, data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sendgrid.send({
        from: `Gritty Grammer <${from}>`,
        to,
        text: body,
        subject,
        templateId,
        dynamicTemplateData: data
      });

      resolve(true)
    } catch (err) {
			console.log(err)
      resolve(false)
    }
  })
};

module.exports = emailService;