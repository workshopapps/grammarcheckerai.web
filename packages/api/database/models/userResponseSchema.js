const { v4 } = require("uuid");
const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    audioURL: {
      type: String,
    },
     textInput:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userResponse", schema);