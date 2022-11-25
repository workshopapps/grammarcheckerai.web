const { v4 } = require("uuid");
const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    status: {
      type: String
    }, 
    error: {
        type: String
    }, 
    conversationId: {
        type: String, 
        ref: "conversation"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("responseStatus", schema);