const banana = require('@banana-dev/banana-dev');
const UserResponse = require('../database/models/userResponseSchema');
const BotResponse = require('../database/models/botResponseSchema');
const Message = require('../database/models/messageSchema');
const { environment } = require('../config/environment')

const { API_KEY, MODEL_KEY } = environment;

async function getBotResponse(req, res) {
    try {
        // reading data from request body
        const userId = req.body.userId;
        const conversationId = req.body.conversationId;
        const mp3File = req.file;

        if (!userId || !conversationId || !mp3File) {
            return res.status(400).send({
                status: "Bad Request",
                message: "userId, conversationId and audio file must be provided"
            });
        }

        // Send audio to Whisper to get audio transcription
        const mp3 = mp3File.buffer.toString('base64');
        const modelParameters = { "mp3BytesString": mp3 };
        const out = await banana.run(API_KEY, MODEL_KEY, modelParameters);

        const transcribedAudioText = out?.modelOutputs[0]?.text;
        if (!transcribedAudioText) {
            return res.status(400).send({
                status: "Bad Request",
                message: `OpenAI Whisper: ${out.modelOutputs[0].message}` || "OpenAI Whisper: Unknown error"
            });
        }

        // Send audio transcription to Grammar Correction to get corrected text
        let correctedText = "";

        // Send corrected text to GPT3 to get bot response
        let botReply = "";

        // upload audio file to storage
        let audioURL = mp3File.originalname;

        // save userResponse, botResponse and message
        const userResponse = await UserResponse.create({
            userId,
            audioURL
        });

        const botResponse = await BotResponse.create({
            transcribedAudioText,
            correctedText,
            botReply
        })

        const messageDocument = await Message.create({
            conversationId,
            userResponseId: userResponse._id,
            botResponseId: botResponse._id
        })

        res.status(201).send({
            message: "Message exchange successfully completed between user and bot",
            data: {
                userResponse,
                botResponse,
                conversationId
            }
        });

    } catch (err) {
        return res.status(500).send({
            status: "Internal server error",
            message: err
        })
    }
}

module.exports = getBotResponse