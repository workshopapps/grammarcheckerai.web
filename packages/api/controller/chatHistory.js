const { getUser } = require("../middlewares/UserRestriction/userAccessControl");
const Conversation = require("../database/models/conversationSchema");
const Message = require("../database/models/messageSchema");
const BotResponse = require("../database/models/botResponseSchema");
const UserResponse = require("../database/models/userResponseSchema");

async function chatHistory(req, res) {
  const user = await getUser(req, res);
  const conversations = await Conversation.find({ userId: user._id });

  if (!conversations) {
    res.status(404);
    res.json({ message: "No chat history found" });
    return;
  }

  if (conversations) {
    // getting all conversation id
    const conversationId = conversations.map((conv) => {
      return conv._id;
    });
    // getting all user messages
    const messages = await Message.find({ conversationId });

    // getting all user responses
    const userResponseId = messages.map((data) => {
      return data.userResponseId;
    });
    const userResponse = await UserResponse.find({ userResponseId });

    // getting all bot responses
    const botResponseId = messages.map((data) => {
      return data.botResponseId;
    });
    const botResponse = await BotResponse.find({ botResponseId });

    res.status(200);
    res.json({ userResponse, botResponse });
  }
}
module.exports = chatHistory;
