const Conversation = require('../database/models/conversationSchema');
const Message = require('../database/models/messageSchema');

async function startConversation(req, res) {
    try {
        const userId = req.query.userId;

        let conversation, messageHistory;
        conversation = await Conversation.findOne({ userId });

        // Handles starting of conversation for users that are not logged in
        if (!userId && !conversation) {
            return res.status(200).json({
                success: true,
                message: "New conversation started - not logged in user",
                data: {
                    conversation: conversation || null,
                    messageHistory: messageHistory || [],
                    botInitialMessage: (req.session.chatLog) ? null : "Hi, how can I help you today?"
                }
            })
        }

        // Handles creation of conversation for new users
        if (userId && !conversation) {
            conversation = await Conversation.create({ userId });
        }

        // Fetches conversation history
        messageHistory = await Message.find({ conversationId: conversation._id}).populate({
            path: "userResponseId botResponseId"
        });

        return res.status(200).json({
            success: true,
            message: "New conversation started - logged in user",
            data: {
                conversation,
                messageHistory,
                botInitialMessage: (req.session.chatLog) ? null : "Hi, how can I help you today?"
            }
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }

}

module.exports = startConversation;