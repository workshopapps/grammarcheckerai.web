const sendgrid = require("@sendgrid/mail");
const { environment } = require("../config/environment.js");
const { SENDGRID_API_KEY, EMAIL_FROM } = environment; 
sendgrid.setApiKey(SENDGRID_API_KEY);

const emailService = async ({ to, subject, templateId, dynamicTemplateData }) => {
  
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
      console.log(err.response.body)
      resolve(false);
    }
  });
};

module.exports = emailService;
