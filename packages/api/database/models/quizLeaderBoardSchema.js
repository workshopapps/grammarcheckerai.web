const mongoose = require("mongoose");
const { v4 } = require("uuid");

let schema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => v4(),
  },
  userId: {
    type: String,
  },
  username: {
    type: String,
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("quizLeaderBoard", schema);
