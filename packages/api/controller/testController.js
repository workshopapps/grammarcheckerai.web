const app = require("../app");
const express = require("express");


exports.home = async (req, res) => {
    const status = {
      home: { status: "ok" },
      login: { status: "ok" },
      signUp: { status: "ok" },
      linkedIn: { status: "down" },
      googleAuth: { status: "ok" },
      logout: { status: "ok" },
      sendAudio: { status: "ok" },
    };
  return res.status(200).send(status);
};

