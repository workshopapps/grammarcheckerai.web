const { parseBuffer } = require("music-metadata");
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
const { translateFromEnglish } = require("../scripts/translate");
const fileUploadToS3Bucket = require("./uploadBuffer");

const languageMap = {
  English: "en",
  "English (AU)": "en_au",
  "English (UK)": "en_uk",
  "English (US)": "en_us",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Portuguese: "pt",
  Dutch: "nl",
  Hindi: "hi",
  Japanese: "ja",
};

async function getBotResponse(req, res) {
  try {
    const conversationId = req.body.conversationId;
    const language = req.body.language || "English";
    const audioFile = req.file; // retrieves file buffer and metadata set by multer

    // checks if file is available
    if (!audioFile) {
      return res.status(400).send({
        success: false,
        message: "Attach an audio file",
      });
    }
    const metadata = await parseBuffer(audioFile.buffer, audioFile.mimetype);
    console.log(metadata.format.duration.toFixed(2));
    // checks if specified language is not available
    if (!languageMap[language]) {
      return res.status(400).send({
        success: false,
        message: "Specified language is not supported",
      });
    }

    // initiate file upload to aws s3 bucket
    let audioUrl = fileUploadToS3Bucket(audioFile.buffer);

    // Send audio to Assembly AI to get audio transcription
    const assemblyAIAudioUrl = await uploadFileForURL(audioFile.buffer); // upload file and get url
    const preTranscriptId = await uploadFileUrlToInitiateTranscription(
      assemblyAIAudioUrl,
      languageMap[language]
    ); // upload url and initiate transcription
    const transcribedAudioText = await getTranscriptionFromAssembly(
      preTranscriptId
    ); // process and download transcript

    if (!transcribedAudioText) {
      return res.status(400).send({
        success: false,
        message:
          "Assembly AI: Unknown error or confirm selected language is the same as in audio",
      });
    }

    // Send transcript to OPenAI Grammar Correction to get corrected text
    let grammarCheckResponse = await grammarCheckHandler(
      transcribedAudioText,
      language
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

    // translate bot reply if specified language is not English
    if (
      !["English", "English (AU)", "English (UK)", "English (US)"].includes(
        language
      )
    ) {
      botReply = await translateFromEnglish(botReply, language);
    }

    chatLog = appendConversationToChatLog(
      correctUserResponseInTxt,
      botRes,
      chatLog
    );
    req.session.chatLog = chatLog; // set updated chat log to session
    console.log(req.session.chatLog);

    // await file upload to aws s3 bucket to get file url
    audioUrl = await audioUrl;

    // construct response
    let userResponse, botResponse;

    // for not logged in users
    if (!conversationId) {
      userResponse = {
        audioURL: audioUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      botResponse = {
        transcribedAudioText,
        correctedText: correctUserResponseInTxt.trim(),
        botReply,
        language: language,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } else {
      // for logged in users
      userResponse = await UserResponse.create({
        audioURL: audioUrl,
      });

      botResponse = await BotResponse.create({
        transcribedAudioText,
        correctedText: correctUserResponseInTxt.trim(),
        botReply,
        language,
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
    return res.status(400).send({
      success: false,
      message: "An error occured",
      errorCode: err.code,
      error: err,
    });
  }
}

module.exports = getBotResponse;
