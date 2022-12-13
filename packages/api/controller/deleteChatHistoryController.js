const Message = require("../database/models/messageSchema");
const { userCollection } = require("../database/models/userSchema");

const deleteChatHistory = async (req, res) => {
  const userId = req.user._id;
  await Message.deleteMany({ userId });
  return res.status(200).json({
    success: true,
    message: "Conversation history deleted successfully.",
  });
};

module.exports = deleteChatHistory;
