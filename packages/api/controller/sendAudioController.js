const banana = require('@banana-dev/banana-dev');

const UserResponse = require('../database/models/userResponseSchema');
const BotResponse = require('../database/models/botResponseSchema');
const Message = require('../database/models/messageSchema');
const { environment } = require('../config/environment');
const grammarCheckHandler = require('../scripts/grammarCheck');
const { chatHandler, appendConversationToChatLog } = require('../scripts/chat');

const { API_KEY, MODEL_KEY } = environment;

async function getBotResponse(req, res) {
    try {
        const conversationId = req.body.conversationId;
        const mp3File = req.file;   // retrieves file buffer and metadata set by multer

        // checks if file is available
        if (!mp3File) {
            return res.status(400).send({
                success: false,
                message: "file property can't be empty"
            });
        }

        // Send audio to Whisper to get audio transcription
        const mp3 = mp3File.buffer.toString('base64');
        const modelParameters = { "mp3BytesString": mp3 };
        const out = await banana.run(API_KEY, MODEL_KEY, modelParameters);

        const transcribedAudioText = out?.modelOutputs[0]?.text?.trim();
        if (!transcribedAudioText) {
            return res.status(400).send({
                success: false,
                message: `OpenAI Whisper: ${out.modelOutputs[0].message}` || "OpenAI Whisper: Unknown error"
            });
        }

        // Send audio transcription to Grammar Correction to get corrected text
        let grammarCheckResponse = await grammarCheckHandler(transcribedAudioText, "English");
        
        // Handling OpenAI Error
        if (!grammarCheckResponse) {
            return res.status(500).send({
                success: false,
                message: "OpenAI internal error"
            });
        }
        let { correctUserResponseInTxt } = grammarCheckResponse;

        // Send corrected text to GPT3 to get bot response and update chat log
        let chatLog, botReply;
        chatLog = req.session.chatLog; // get chat log from session
        const botRes = await chatHandler(correctUserResponseInTxt, chatLog);
        botReply = botRes.replace("AI:", "").trim();
        chatLog = appendConversationToChatLog(
            correctUserResponseInTxt,
            botRes,
            chatLog
        );
        req.session.chatLog = chatLog; // set updated chat log to session

        // upload audio file to storage. TODO: update to url when amazon s3 bucket credentials is received
        let audioURL = mp3File.originalname;

        // construct response
        let userResponse, botResponse;

        // for not logged in users
        if (!conversationId) {
            userResponse = { 
                audioURL,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            botResponse = {
                transcribedAudioText,
                correctedText: correctUserResponseInTxt.trim(),
                botReply,
                language: "English",
                createdAt: new Date(),
                updatedAt: new Date()
            }

        } else {
            // for logged in users
            userResponse = await UserResponse.create({
                audioURL
            });

            botResponse = await BotResponse.create({
                transcribedAudioText,
                correctedText: correctUserResponseInTxt.trim(),
                botReply
            })

            await Message.create({
                conversationId,
                userResponseId: userResponse._id,
                botResponseId: botResponse._id
            })
        }

        res.status(200).send({
            success: true,
            message: "Message exchange successfully completed between user and bot",
            data: {
                userResponse,
                botResponse,
                conversationId: conversationId || null
            }
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}

module.exports = getBotResponse