const grammarCheckHandler = require('../scripts/grammarCheck');
const UserResponse = require("../models");
const BotResponse =require("../models");
const Message = require("../models");
const { chatHandler, appendConversationToChatLog } = require('../scripts/chat');


async function BotTextResponse(req, res) {
  try {
    const conversationId = req.body.conversationId;
    const textInput = req.body.textInput;   // retrieves chat from body

     // checks if  object is empty
     if (!textInput) {
        return res.status(400).send({
            success: false,
            message: "textInput cannot be empty"
        });
    }

     // Send text transcription to Grammar Correction to get corrected text
     let grammarCheckResponse = await grammarCheckHandler(textInput, "English");

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

     // construct response
     let userResponse, botResponse;

      // for not logged in users
      if (!conversationId) {
          userResponse = { 
              textInput,
              audioURL: null,
              createdAt: new Date(),
              updatedAt: new Date()
          };

          botResponse = {
              correctedText: correctUserResponseInTxt.trim(),
              botReply,
              language: "English",
              createdAt: new Date(),
              updatedAt: new Date()
          }

      } else {
          // for logged in users
          userResponse = await UserResponse.create({ //
            textInput
          });

          botResponse = await BotResponse.create({ //
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


  } catch (error) {
    return res.status(500).send({
        success: false,
        message: error
    })  
  }

}

module.exports = BotTextResponse;