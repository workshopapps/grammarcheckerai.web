const Message = require("../database/models/messageSchema");

exports.getChatHistory = async (req, res) => {
  const userId = req.user._id;
  let messages = await Message.find({ userId }).populate({
    path: "userResponseId botResponseId",
  });
  return res.status(200).json({
    success: true,
    conversationHistory: messages,
  });
};

exports.deleteChatHistory = async (req, res) => {
  const userId = req.user._id;
  const { messageId } = req.params;
  const message = await Message.findOne({ userId, _id: messageId });
  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found!",
    });
  }
  await Message.findByIdAndDelete(messageId);
  return res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
  });
};

exports.clearChatHistory = async (req, res) => {
  const userId = req.user._id;
  await Message.deleteMany({ userId });
  return res.status(200).json({
    success: true,
    message: "Conversation history deleted successfully.",
  });
};
