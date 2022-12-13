const Message = require("../database/models/messageSchema");
const { userCollection } = require("../database/models/userSchema");

const chatHistory = async (req, res) => {
  const userId = req.user._id;
  let messages = await Message.find({ userId }).populate({
    path: "userResponseId botResponseId",
  });
  return res.status(200).json({
    success: true,
    conversationHistory: messages,
  });
};

module.exports = chatHistory;
