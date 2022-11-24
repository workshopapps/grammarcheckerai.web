const sgMail = require("@sendgrid/mail");
const enviroment = require("../config/environment.js");
const { SENDGRID_API_KEY } = enviroment;
const welcome = require("../utilities/email");
sgMail.setApiKey(SENDGRID_API_KEY);

class Email {
  constructor(to, name, subject, actionurl) {
    this.to = to;
    this.subject = subject;
    this.name = name;
    this.actionurl = actionurl;
  }
  async send() {
    try {
      const msg = {
        to: this.to,
        from: "Gritty Grammer <akan.otong@pmt.ng>", // Use the email address or domain you verified above
        subject: this.subject,
        html: welcome(this.name, this.actionurl),
      };
      return await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Email;
