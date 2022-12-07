const mongoose = require("mongoose");
const Joi = require("joi");
let schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subscription: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);
exports.authValidatorSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "xyz", "io", "co", "org"] },
    })
    .lowercase()
    .required(),
});

module.exports = mongoose.model("newsLetterSubscription", schema);
