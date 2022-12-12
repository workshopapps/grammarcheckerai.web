const Message = require("../database/models/messageSchema");
const { userCollection } = require("../database/models/userSchema");

const deleteChatHistory = async (req, res) => {
  const { userId } = req.query;
  const user = await userCollection.findById(userId);
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "No user found!",
    });
  }
  await Message.deleteMany({ userId });
  return res.status(200).json({
    success: true,
    message: "Conversation history deleted successfully.",
  });
};

module.exports = deleteChatHistory;
