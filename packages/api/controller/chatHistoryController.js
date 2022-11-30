const {
  userResponse,
  conversation,
  message,
  botResponse,
} = require("../models");

exports.history = async (req, res) => {
  const userId = req.body.userId;
  var conversation_id;
  var conversations = await conversation.findAll({ where: { userId: userId } });
  if (conversations.length == 0) {
    return res.status(401).send({ message: "No history available" });
  } else {
    conversation_id = conversations.id;
    messageHistory = message.find({
      where: { conversationId: conversation_id },
    });
    messageHistory.update({
      path: "userResponseId botResponseId",
    });
    return res.status(200).json({
      conversationHistory: messageHistory,
      pageTitle: "correction history endpoint",
      status: "success",
    });
  }
};
