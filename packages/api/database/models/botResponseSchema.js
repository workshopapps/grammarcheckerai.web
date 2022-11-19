const { v4 } = require("uuid");
const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    transcribedAudioText: {
      type: String,
    },
    correctedText: {
      type: String,
    },
    botReply: {
      type: String,
    },
    language: {
      type: String,
      default: "English",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("botResponse", schema);