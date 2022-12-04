const emailService = require("./email.service");
const { environment } = require("../config/environment");

const { NEWSLETTER_TEMPLATE_ID } = environment;

const url = "https://speakbetter.hng.tech/"

exports.send = async (email) => {
    await emailService({
      to: email,
      subject: "Welcome to Speak Better Newsletter",
      templateId: NEWSLETTER_TEMPLATE_ID,
      dynamic_template_data: {
        name: "User",
        actionurl: url,
      },
    });
}
