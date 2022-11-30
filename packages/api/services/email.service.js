const sendgrid = require("@sendgrid/mail");
const { environment } = require("../config/environment.js");
const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = environment;
const sgMail = require("@sendgrid/mail");
sendgrid.setApiKey(SENDGRID_API_KEY);

const emailService = async ({ to, subject, templateId, dynamicTemplateData }) => {
  console.log({ to, subject, templateId, dynamicTemplateData });
  return new Promise(async (resolve, reject) => {
    try {
      await sendgrid.send({
        from: `Speak Better <${EMAIL_FROM}>`,
        to, 
        subject,
        templateId,
        dynamicTemplateData,
      });

      resolve(true);
    } catch (err) {  
      resolve(false);
    }
  });
};

module.exports = emailService;
