const Cron = require("node-cron");
const newsLetterSubscription = require("../database/models/newsLetterSubscriptionSchema");
const emailService = require("../services/email.service");
const { environment } = require("../config/environment");
const { NEWSLETTER_TEMPLATE_ID } = environment;

class CronJob {
  constructor() {
    //10am, first day of every week
    let send_news_letter = Cron.schedule("00 10 * * 1", () => {
      this.sendNewsLetter();
    });
    send_news_letter.start();
  }

  async sendNewsLetter() {
    try {
      const subscribed_users = await newsLetterSubscription.find();
      if (subscribed_users.length < 1) {
        return true;
      }

      for (let i = 0; i < subscribed_users.length; i++) {
        await emailService({
          to: subscribed_users[i].email,
          subject: "Newsletter",
          templateId: NEWSLETTER_TEMPLATE_ID,
          dynamic_template_data: {
            name: subscribed_users[i].firstName || "DEAR ESTEEMED CUSTOMER",
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "something went wrong while handling your request",
      });
    }
  }
}

module.exports = CronJob;
