const axios = require("./axios");
const { environment } = require("../config/environment");
const { SENDGRID_API_KEY, TEST_EMAIL_TEMPLATE_ID } = environment;
const emailService = require("../services/email.service");
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(SENDGRID_API_KEY);

exports.home = async (req, res) => {
  var status = [];
  await axios
    .get("/v1")
    .then((home) => {
      if (home.status == 200) {
        status.push({ home: { status: "ok" } });
      }
    })
    .catch((error) => {
      status.push({ home: { status: "down" } });
    });
  await axios({
    method: "POST",
    url: "v1/user/profile/update",
    data: {
      email: "onijlo@mal.com",
      password: "Password",
    },
  })
    .then((response) => {
      if (response.status != 404) {
        status.push({ updateUser: { status: "ok" } });
      }
    })
    .catch((err) => {
      if (err.response.status != 404) {
        status.push({ updateUser: { status: "ok" } });
      }
    });

  await axios
    .post("/v1/conversation/sendAudio")
    .then((sendAudio) => {
      if (sendAudio.status == 200) {
        status.push({ sendAudio: { status: "ok" } });
      }
    })
    .catch((err) => {
      if (err.response.status != 404) {
        status.push({ sendAudio: { status: "ok" } });
      }
    });

  await axios
    .get("/api-docs")
    .then((apiDocs) => {
      if (apiDocs.status === 200) {
        status.push({ apiDocs: { status: "ok" } });
      }
    })
    .catch((err) => {
      if (err.response.status != 404) {
        status.push({ apiDocs: { status: "ok" } });
      }
    });

  await axios
    .post("v1/auth/logout")
    .then((response) => {
      if (response.status == 200) {
        status.push({ logoutPage: { status: "ok" } });
      }
    })
    .catch((err) => {
      status.push({ logoutPage: { status: "down" } });
    });

  await axios
    .post("/v1/auth/login")
    .then((response) => {
      if (response.status == 200) {
        status.push({ loginPage: { status: "ok" } });
      }
    })
    .catch((err) => {
      if (err.response.status != 404) {
        status.push({ loginPage: { status: "ok" } });
      }
    });
  await axios
    .get("/v1/conversation/start")
    .then((response) => {
      if (response.status == 200) {
        status.push({ conversation: { status: "ok" } });
      }
    })
    .catch((err) => {
      if (err.response.status != 404) {
        status.push({ conversation: { status: "ok" } });
      }
    });

  await axios
    .get("/v1/quiz")
    .then((response) => {
      if (response.status == 200) {
        status.push({ quiz: { status: "ok" } });
      }
    })
    .catch((err) => {
      if (err.response.status != 404) {
        status.push({ quiz: { status: "ok" } });
      } else {
        status.push({ quiz: { status: "down" } });
      }
    });
  await axios
    .post("/v1/contact")
    .then((response) => {
      if (response.status == 200) {
        status.push({ contact: { status: "ok" } });
      }
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response.status != 404) {
        status.push({ contact: { status: "ok" } });
      } else {
        status.push({ contact: { status: "down" } });
      }
    });
  await axios
    .get("/v1/rating")
    .then((response) => {
      if (response.status == 200) {
        status.push({ rating: { status: "ok" } });
      }
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response.status != 404) {
        status.push({ rating: { status: "ok" } });
      } else {
        status.push({ rating: { status: "down" } });
      }
    });
  await axios
    .post("/v1/newsletter/signupNewsletterEmail")
    .then((response) => {
      if (response.status == 200) {
        status.push({ newsletter: { status: "ok" } });
      }
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response.status != 404) {
        status.push({ newsletter: { status: "ok" } });
      } else {
        status.push({ newsletter: { status: "down" } });
      }
    });
  return res.status(200).json(status);
};

exports.sendMail = async (req, res) => {
  const { email, name } = req.body;
  await emailService({
    to: email,
    subject: "Speak Better: Welcome!",
    templateId: TEST_EMAIL_TEMPLATE_ID,
    dynamic_template_data: {
      name: name,
      actionurl: "https://speakbetter.hng.tech",
    },
  })
    .then(() => {
      return res
        .status(200)
        .send({ success: true, message: "Email Sent successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .send({
          success: false,
          message: "there was an error",
          error: err.message,
        });
    });
};
