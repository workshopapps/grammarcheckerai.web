const mongoose = require("mongoose");
const Joi = require("joi");
let schema = new mongoose.Schema(
    {
        firstName: {
          type: String,
          required: true,
        },
        lastName: { 
          type: String,
        },
        email: {
            type: String,
            required: true,
          },
          phoneNumber: {
            type: Number,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
    },
    {
      timestamps: true,
    }
)
exports.authValidatorSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "xyz", "io", "co", "org"] },
    })
    .lowercase()
    .required(),
});
module.exports = mongoose.model("ContactUs", schema);