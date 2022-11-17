const { v4 } = require("uuid");
const mongoose = require("mongoose");
const Joi = require("joi");


let schema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => v4(),
  },
  userID: {
    type: String,
    ref: "user",
  },
  audioURL: {
    type: String,
  },
  responseTxt: {
    type: String,
  },
  transcribedAudioResponse: {
    type: String,
  },

  correctTranscribedResponse: {
    type: String,
    default: () => v4(),
  } 
}, {
    timestamps:true
});

exports.userResponseCollection = mongoose.model("userResponse", schema);
