const { userResponse } = require("../database/models/userResponseSchema");
const { conversation } = require("../database/models/conversationSchema");
const { message } = require("../database/models/messageSchema");
const { botResponse } = require("../database/models/botResponseSchema");

exports.history = async (req, res) => {
  const { userId } = req.params;
  let conversation_id;
  let conversation = await conversation.find({ userId: userId });
  if (!conversation) {
    return res
      .status(400)
      .send({ success: false, message: "No history available" });
  }
  if (conversation) {
    conversation_id = data[0]._id;
  }
  messageHistory = await Message.find({
    conversationId: conversation_id,
  }).populate({
    path: "userResponseId botResponseId",
  });
  return res.status(200).json({
    conversationHistory: messageHistory,
    pageTitle: "correction history endpoint",
    status: "success",
  });
};
