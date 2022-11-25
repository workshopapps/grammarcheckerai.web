const sendgrid = require("@sendgrid/mail");
const { environment } = require("../config/environment.js");
const { SENDGRID_API_KEY, EMAIL_FROM } = environment;

sendgrid.setApiKey(SENDGRID_API_KEY);

const emailService = async ({ to, subject, body, templateId, data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sendgrid.send({
        from: `Speak Better <${EMAIL_FROM}>`,
        to,
        text: body,
        subject,
        templateId,
        dynamicTemplateData: data,
      });

      resolve(true);
    } catch (err) { 
      resolve(false);
    }
  });
};

module.exports = emailService;
