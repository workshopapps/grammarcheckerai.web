const { v4 } = require("uuid");
const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    conversationId: {
      type: String,
      ref: "conversation",
    },
    userResponseId: {
      type: String,
      ref: "userResponse",
    },
    botResponseId: {
      type: String,
      ref: "botResponse",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", schema);