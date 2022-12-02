const mongoose = require("mongoose");
const { v4 } = require("uuid");
const { environment } = require("../../config/environment");
const { JWT_SECRET } = environment;

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: [true, "A subscription must be made by a User"],
      default: () => v4(),
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    interval: {
      type: String,
      enum: ["weekly", "monthly", "biannually", "annually"],
      default: "monthly",
      required: true,
    },
    paymentGateway: {
      type: String,
      enum: ["paystack", "flutterwave", "stripe"],
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "A subscription must have a price"],
    },
    txref: {
      type: String,
    },
    status: {
      type: String,
      enum: ["initiated", "pending", "succesful", "failed"],
      default: "initiated",
    },
    currency: {
      type: String,
      enum: ["NGN", "USD", "EUR", "YEN", "GBP"],
      default: "NGN",
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
