const ResponseStatus = require('../database/models/responseStatusSchema');
const Message = require('../database/models/messageSchema');


// This route can be polled to get the status of the response after sending an audio reply via the /sendAudio route.
async function getResponseStatus(req, res) {

    const statusId = req.params.statusId;

    if (!statusId) {
        return res.status(401).json({
            message: 'statusId is required.'
        })
    }

    const responseStatus = ResponseStatus.findOne({
        _id: statusId
    });

    if (!responseStatus) {
        return res.status(401).json({
            message: 'The provided statusId is invalid'
        });
    }

    if (responseStatus.status === 'success') {
        const message = Message.findOne({
            conversationId: responseStatus.conversationId
        });

        return res.json({
            responseStatus, message
        });
    } else {
        return res.json({
            responseStatus
        });
    }
}


module.exports = getResponseStatus;