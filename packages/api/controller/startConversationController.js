const Conversation = require("../database/models/conversationSchema");
const Message = require("../database/models/messageSchema");

async function startConversation(req, res) {
  try {
    let user = req.user;
    let userId = user?._id;

    let conversation, messageHistory;
    conversation = await Conversation.findOne({ userId });

    // Handles starting of conversation for users that are not logged in
    if (!userId && !conversation) {
      return res.status(200).json({
        success: true,
        message: req.session.chatLog
          ? "Ongoing conversation - not logged in user"
          : "New conversation started - not logged in user",
        data: {
          conversation: conversation || null,
          messageHistory: messageHistory || [],
          botInitialMessage: req.session.chatLog
            ? null
            : "Hi, how can I help you today?",
        },
      });
    }

    // Handles creation of conversation for new users
    if (userId && !conversation) {
      conversation = await Conversation.create({ userId });
    }

    // Fetches conversation history
    messageHistory = await Message.find({
      conversationId: conversation._id,
    }).populate({
      path: "userResponseId botResponseId",
    });

    return res.status(200).json({
      success: true,
      message: req.session.chatLog
        ? "Ongoing conversation - logged in user"
        : "New conversation started - logged in user",
      data: {
        conversation,
        messageHistory,
        botInitialMessage: req.session.chatLog
          ? null
          : `Hi ${user.firstName}, how can I help you today?`,
      },
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: " An error occured",
      errorCode: err.code,
      error: err,
    });
  }
}

module.exports = startConversation;
