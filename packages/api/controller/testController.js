const app = require("../app");
const express = require("express");
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
  const loginPage = await axios
    .get("/api/v1/auth/login")
    .then((response) => {
      if (response.status == 200) {
        status.push({ loginPage: { status: "ok" } });
      }
    })
    .catch((err) => {
      status.push({ loginPage: { status: "down" } });
    });

    const sendAudio = await axios
      .get("/api/v1/sendAudio")
      .then((sendAudio) => {
        if (sendAudio.status == 200) {
          status.push({ sendAudio: { status: "ok" } });
        }
      })
      .catch((err) => {
        status.push({ sendAudio: { status: "down" } });
      });

      const logoutPage = await axios
        .get("/api/v1/logout")
        .then((response) => {
          if (response.status == 200) {
            status.push({ logoutPage: { status: "ok" } });
          }
        })
        .catch((err) => {
          status.push({ logoutPage: { status: "down" } });
        });

        const test = await axios
          .get("/api/v1/test")
          .then((response) => {
            if (response.status == 200) {
              status.push({ testPage: { status: "ok" } });
            }
          })
          .catch((err) => {
            status.push({ testPage: { status: "down" } });
          });

  return res.status(200).send(status);
};
