const { conversation, message } = require("../models");

async function startConversation(req, res) {
  try {
    let user = req.user;
    let userId = user?._id;

    let conversations, messageHistory;
    conversations = await conversation.findOne({ where: { userId }});

    // Handles starting of conversation for users that are not logged in
    if (!userId && !conversation) {
      return res.status(200).json({
        success: true,
        message: req.session.chatLog
          ? "Ongoing conversation - not logged in user"
          : "New conversation started - not logged in user",
        data: {
          conversation: conversations || null,
          messageHistory: messageHistory || [],
          botInitialMessage: req.session.chatLog
            ? null
            : "Hi, how can I help you today?",
        },
      });
    }

    // Handles creation of conversation for new users
    if (userId && !conversations) {
      conversation = await conversation.create({ userId });
    }

    // Fetches conversation history
    messageHistory = await message.findOne({
      conversationId: conversation.id,
    })
		messageHistory.update({
      path: "userResponseId botResponseId",
    });

    return res.status(200).json({
      success: true,
      message: req.session.chatLog
        ? "Ongoing conversation - logged in user"
        : "New conversation started - logged in user",
      data: {
        conversations,
        messageHistory,
        botInitialMessage: req.session.chatLog
          ? null
          : `Hi ${user.firstName}, how can I help you today?`,
      },
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
}

module.exports = startConversation;
