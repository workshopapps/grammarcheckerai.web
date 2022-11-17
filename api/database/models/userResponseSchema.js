import { v4 } from "uuid";
import mongoose from "mongoose";
import Joi from "joi";

let schema = new mongoose.Schema(
  {
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
    },
  },
  {
    timestamps: true,
  }
);

export const userResponseCollection = mongoose.model("userResponse", schema);
