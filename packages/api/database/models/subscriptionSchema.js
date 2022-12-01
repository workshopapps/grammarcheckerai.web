const mongoose = require("mongoose");
const { environment } = require("../../config/environment");
const { JWT_SECRET } = environment;

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A subscription must be made by a User"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subcriptionId: {
      type: String,
      required: true,
    },
    subcriptionType: {
      type: String,
      enum: ["monthly", "yearly"],
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
      enum: ["monthly", "yearly"],
      default: "monthly",
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
