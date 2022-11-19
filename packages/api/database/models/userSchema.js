const { v4 } = require("uuid");
const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    language: {
      type: String,
      default: "English",
    },
    password: {
      type: String,
      required: true
    },
    deviceID: {
      type: String,
      default: () => v4(),
    },
  },
  {
    timestamps:true 
  }
);

/**
 * Signup and login schema
 * The return value is a Joi object in all cases.
 */
exports.authValidatorSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "xyz", "io", "co", "org"] },
    })
    .lowercase()
    .required(),
});

exports.userCollection = mongoose.model("user", schema);
