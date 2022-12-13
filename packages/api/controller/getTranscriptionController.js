const fetch = require("node-fetch");
const { environment } = require("../config/environment");
const BotResponse = require("../database/models/botResponseSchema");
const Message = require("../database/models/messageSchema");
const UserResponse = require("../database/models/userResponseSchema");
const { chatHandler, appendConversationToChatLog } = require("../scripts/chat");
const grammarCheckHandler = require("../scripts/grammarCheck");
const { translateFromEnglish } = require("../scripts/translate");

let socket;
const importSocket = (soc) => {
  socket = soc;
  // console.log(soc.id);
};

const { ASSEMBLYAI_API_KEY } = environment;

async function getTranscription(req, res) {
  try {
    const url = `https://api.assemblyai.com/v2/transcript/${req.body.transcript_id}`;

    const params = {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
      },
      method: "GET",
    };

    let response = await fetch(url, params);
    let jsonResponse = await response.json();
    // console.log(jsonResponse);

    // If they were no voice or translatable sound found
    if (!jsonResponse.words.length) {
      // Emit voiceNotFound error
      res.status(200).send({
        success: false,
        message: "Audio not detected from provided audio. Please be louder.",
      });
      socket.emit(
        "voiceNotFound",
        400,
        "Audio not detected from provided audio. Please be louder."
      );
      return;
    }
    const queryString = jsonResponse.webhook_url.split("?")[1];
    const searchParams = new URLSearchParams(queryString);
    const language = searchParams.get("language");
    const userId = searchParams.get("userId");
    // Send transcript to OPenAI Grammar Correction to get corrected text
    let grammarCheckResponse = await grammarCheckHandler(
      jsonResponse.text,
      language
    );

    //   // Handling OpenAI Grammar Correction Error
    if (!grammarCheckResponse) {
      res.status(200).send({
        success: false,
        message: "OpenAI internal error",
      });
      // Emit OpenAI error
      socket.emit("OpenAIError", 500, "OpenAI internal error");
      return;
    }
    let { correctUserResponseInTxt } = grammarCheckResponse;

    // Send corrected text to OpenAI GPT3 to get bot response and update chat log
    let chatLog, botReply;
    chatLog = req.session.chatLog; // get chat log from session
    const botRes = await chatHandler(correctUserResponseInTxt, chatLog);
    botReply = botRes.replace("AI:", "").trim();

    //   // translate bot reply if specified language is not English
    if (
      !["english", "english (au)", "english (uk)", "english (us)"].includes(
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

    // construct response
    let userResponse, botResponse;
    let transcribedAudioText = jsonResponse.text;

    // for not logged in users
    if (userId === "undefined") {
      userResponse = {
        audioURL: jsonResponse.audio_url,
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
        audioURL: jsonResponse.audio_url,
      });

      botResponse = await BotResponse.create({
        transcribedAudioText,
        correctedText: correctUserResponseInTxt.trim(),
        botReply,
        language,
      });

      await Message.create({
        userId,
        userResponseId: userResponse._id,
        botResponseId: botResponse._id,
      });
    }

    const data = {
      userResponse,
      botResponse,
      userId: userId || null,
    };
    res.status(200).send("DONE");
    // Emit Response
    socket.emit("receive-transcription", 200, data);
  } catch (error) {
    res.status(200).send("DONE");
    // Emit Server error
    socket.emit("serverError", 500, "Something went really wrong");
  }
}

module.exports = { getTranscription, importSocket };
