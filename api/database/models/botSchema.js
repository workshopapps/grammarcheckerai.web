import { v4 } from "uuid";
import mongoose from "mongoose";
import Joi from "joi";

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    response: {
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

export const authCollection = mongoose.model("bot", schema);
