const { Configuration, OpenAIApi } = require("openai");
const { environment } = require("../config/environment");

const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const restartSequence = "\nHuman:";
const sessionPrompt =
  "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nAI: Hi Name. How can I help you today?";

exports.appendConversationToChatLog = function (
  correctUserResponseInTxt,
  botReply = null,
  chatLog = null
) {
  if (!chatLog) chatLog = sessionPrompt; // Sets the chatlog equal the session prompt, at the start of the conversation, where the chat log is empty
  return `${chatLog}${restartSequence} ${correctUserResponseInTxt} ${botReply}`;
};

exports.chatHandler = async function (
  correctUserResponseInTxt,
  chatLog = null
) {
  try {
    if (!chatLog) chatLog = sessionPrompt; // Sets the chatlog equal the session prompt, at the start of the conversation, where the chat log is empty
    const promptText = `${chatLog}${restartSequence} ${correctUserResponseInTxt}`;
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: promptText,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    const botReply = response.data.choices[0].text;
    return botReply;
  } catch (error) {
    // next(error)
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};
