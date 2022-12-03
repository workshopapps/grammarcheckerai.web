const mongoose = require("mongoose");
const Joi = require("joi");
let schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
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
