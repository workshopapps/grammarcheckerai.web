function endConversation(req, res) {
    // clears chat log
    req.session.chatLog = undefined;
    
    return res.status(200).json({
        success: true,
        message: "Conversation ended successfully."
    })
}

module.exports = endConversation;