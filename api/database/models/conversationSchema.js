const { v4 } = require("uuid");
const mongoose = require("mongoose");
const Joi = require("joi");


let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    userId: {
      type: String,
      ref: "user",
    },
    userResponseId: {
      type: String,
    },
    botResponseId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

exports.authCollection = mongoose.model("conversation", schema);
