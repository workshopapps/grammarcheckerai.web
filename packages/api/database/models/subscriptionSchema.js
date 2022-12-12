const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subscriptionId: {
      type: String,
      required: true,
      unique: true,
    },
    interval: {
      type: String,
      enum: ["monthly", "quarterly", "annually", "weekly"],
      default: "monthly",
      required: true,
    },
    paymentGateway: {
      type: String,
      enum: ["paystack", "flutterwave", "stripe"],
    },
    amount: {
      type: mongoose.Types.Decimal128,
      required: [true, "A subscription must have a price"],
    },
    txref: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["initiated", "pending", "successful", "failed"],
      default: "initiated",
    },
    currency: {
      type: String,
      enum: ["NGN", "USD", "EUR", "YEN", "GBP", "ZAR"],
      default: "NGN",
    },
    expirationDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
