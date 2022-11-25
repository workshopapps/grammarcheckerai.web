const mongoose = require("mongoose");

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
            trim: true,
            unique: true,
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
module.exports = mongoose.model("ContactUs", schema);