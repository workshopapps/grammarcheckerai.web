const message = require("../database/models/messageSchema");
const { userCollection } = require("../database/models/userSchema");

const chatHistory = async (req, res) => {
  const { userId } = req.query;
  const user = await userCollection.findById(userId);
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "No user found!",
    });
  }
  let messages = await message.find({ userId }).populate({
    path: "userResponseId botResponseId",
  });
  return res.status(200).json({
    conversationHistory: messages,
    pageTitle: "correction history endpoint",
    status: "success",
  });
};

module.exports = chatHistory;
