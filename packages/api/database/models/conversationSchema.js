const { v4 } = require("uuid");
const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    userId: {
      type: String,
      ref: "user",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", schema);