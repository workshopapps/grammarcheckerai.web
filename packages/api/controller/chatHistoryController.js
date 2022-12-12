const Message = require("../database/models/messageSchema");
const { userCollection } = require("../database/models/userSchema");

const chatHistory = async (req, res) => {
  const { userId } = req.params;
  const user = await userCollection.findById(userId);
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "No user found!",
    });
  }
  let messages = await Message.find({ userId }).populate({
    path: "userResponseId botResponseId",
  });
  return res.status(200).json({
    success: true,
    conversationHistory: messages,
  });
};

module.exports = chatHistory;
