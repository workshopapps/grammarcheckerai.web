const UserResponse = require("../database/models/userResponseSchema");
const BotResponse = require("../database/models/botResponseSchema");
const Message = require("../database/models/messageSchema");
const grammarCheckHandler = require("../scripts/grammarCheck");
const { chatHandler, appendConversationToChatLog } = require("../scripts/chat");
const {
  uploadFileForURL,
  uploadFileUrlToInitiateTranscription,
  getTranscriptionFromAssembly,
} = require("../scripts/assemblyAI.js");

async function getBotResponse(req, res) {
  try {
    const conversationId = req.body.conversationId;
    const audioFile = req.file; // retrieves file buffer and metadata set by multer
    const dummyAudioUrl = req.file?.originalname; // TODO: use aws s3 bucket file upload url

    // checks if file is available
    if (!audioFile) {
      return res.status(400).send({
        success: false,
        message: "Attach an audio file",
      });
    }

    // Send audio to Assembly AI to get audio transcription
    const assemblyAIAudioUrl = await uploadFileForURL(audioFile.buffer); // upload file and get url
    const preTranscriptId = await uploadFileUrlToInitiateTranscription(
      assemblyAIAudioUrl
    ); // upload url and initiate transcription
    const transcribedAudioText = await getTranscriptionFromAssembly(
      preTranscriptId
    ); // process and download transcript

    if (!transcribedAudioText) {
      return res.status(400).send({
        success: false,
        message: "Assembly AI: Unknown error",
      });
    }

    // Send transcript to OPenAI Grammar Correction to get corrected text
    let grammarCheckResponse = await grammarCheckHandler(
      transcribedAudioText,
      "English"
    );

    // Handling OpenAI Grammar Correction Error
    if (!grammarCheckResponse) {
      return res.status(500).send({
        success: false,
        message: "OpenAI internal error",
      });
    }
    let { correctUserResponseInTxt } = grammarCheckResponse;

    // Send corrected text to OpenAI GPT3 to get bot response and update chat log
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

    // construct response
    let userResponse, botResponse;

    // for not logged in users
    if (!conversationId) {
      userResponse = {
        audioURL: dummyAudioUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      botResponse = {
        transcribedAudioText,
        correctedText: correctUserResponseInTxt.trim(),
        botReply,
        language: "English",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } else {
      // for logged in users
      userResponse = await UserResponse.create({
        audioURL: dummyAudioUrl,
      });

      botResponse = await BotResponse.create({
        transcribedAudioText,
        correctedText: correctUserResponseInTxt.trim(),
        botReply,
      });

      await Message.create({
        conversationId,
        userResponseId: userResponse._id,
        botResponseId: botResponse._id,
      });
    }

    res.status(200).send({
      success: true,
      message: "Message exchange successfully completed between user and bot",
      data: {
        userResponse,
        botResponse,
        conversationId: conversationId || null,
      },
    });
  } catch (err) {
    throw err;
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
}

module.exports = getBotResponse;
