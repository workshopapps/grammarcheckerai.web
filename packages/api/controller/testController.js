const app = require("../app");
const axios = require("./axios");

exports.home = async (req, res) => {
  var status = [];
  const home = await axios
    .get("/")
    .then((home) => {
      if (home.status == 200) {
        status.push({ home: { status: "ok" } });
      }
    })
    .catch((err) => {
      status.push({ home: { status: "down" } });
    });
  const updateUser = await axios({
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

  const sendAudio = await axios
    .get("/v1/conversation/sendAudio")
    .then((sendAudio) => {
      if (sendAudio.status == 200) {
        status.push({ sendAudio: { status: "ok" } });
      }
    })
    .catch((err) => {
      if (err.response.status != 404) {
        console.log(err.response);
        status.push({ sendAudio: { status: "ok" } });
      }
    });

  const apiDocs = await axios
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

  const logoutPage = await axios
    .get("v1/auth/logout")
    .then((response) => {
      if (response.status == 200) {
        status.push({ logoutPage: { status: "ok" } });
      }
    })
    .catch((err) => {
      status.push({ logoutPage: { status: "down" } });
    });

  const loginPage = await axios
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
    const conversation = await axios
    .post("/v1/conversation/start")
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
  return res.status(200).send(status);
};
