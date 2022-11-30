const sendgrid = require("@sendgrid/mail");
const { environment } = require("../config/environment.js");
const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = environment;
const sgMail = require("@sendgrid/mail");
sendgrid.setApiKey(SENDGRID_API_KEY);

const emailService = ({ to, subject, body, templateId, data }) => {
  const message = {
    to: to,
    from: SENDGRID_EMAIL_FROM,
    subject: subject,
    text: body,
    templateId: templateId,
    dynamicTemplateData: {
      name: data.name,
      actionurl: data.url,
    },
  };
  sgMail
    .send(message)
    .then(() => {
      return { success: true, message: "Email Sent successfully" };
    })
    .catch((err) => {
      console.log(err);
      return {
        success: false,
        message: "There was an error, please try again",
      };
    });
};

module.exports = emailService;
