const { userResponse, conversation, message , botResponse } = require('../models')


exports.history = async (req, res) =>{
    const { userId } = req.params
    let conversation_id;
    let conversations = await conversation.findAll({ where: { userId : userId } })
    if (!conversations){
        return res.status(401).json({ message: "No history available"})
    }
    if (conversations){
        conversation_id = conversations.id.
        console.log(conversation_id)
    }
    messageHistory = await message.find({ where: { conversationId: conversation_id } })
		messageHistory.update({
        path: "userResponseId botResponseId"
    });
    return res.status(200).json({
        conversationHistory : messageHistory ,
        pageTitle: "correction history endpoint",
        status: "success"
    })
}