const sgMail = require("@sendgrid/mail");
const { environment } = require("../config/environment.js");
const { SENDGRID_API_KEY, BASE_URL } = environment;

const welcome = require("../utilities/email");
sgMail.setApiKey(SENDGRID_API_KEY);

class Email {
  constructor(to, name, subject, path) {
    this.to = to;
    this.subject = subject;
    this.name = name;
    this.path = path;
  }
  async send() {
    try {
      const signinPath = `${BASE_URL}/${this.path}`;
      const msg = {
        to: this.to,
        from: "Gritty Grammer <akan.otong@pmt.ng>", // Use the email address or domain you verified above
        subject: this.subject,
        html: welcome(this.name, signinPath),
      };

      return await sgMail.send(msg);
    } catch (error) {
      return false;
    }
  }
}
module.exports = Email;
