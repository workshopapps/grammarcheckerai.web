const emailService = require("./email.service");
const { environment } = require("../config/environment");

const { NEWSLETTER_WELCOME } = environment;

const url = "https://speakbetter.hng.tech/"

exports.send = async (email) => {
    await emailService({
        to: email,
        subject: "Welcome to Speak Better Newsletter",
        templateId: NEWSLETTER_WELCOME,
        data: {
          action_url: url,
        },
      });
}
