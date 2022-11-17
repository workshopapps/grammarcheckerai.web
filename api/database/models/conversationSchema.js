import { v4 } from "uuid";
import mongoose from "mongoose";
import Joi from "joi";

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

export const authCollection = mongoose.model("conversation", schema);
