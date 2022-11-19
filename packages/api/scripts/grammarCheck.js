const { Configuration, OpenAIApi } = require("openai");
const { environment } = require("../config/environment");

const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GPT3 = async function (prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  return response.data.choices[0].text.trim(); // extracts the "text" response and removes leading and trailing white space and line terminator characters.
};

const grammarCheckHandler = async (userResponseInTxt, language = "English") => {
  let prompt, correctUserResponseInTxt;
  prompt = `Is this grammatically incorrect? Respond with yes or no.:\n\n${userResponseInTxt}`;
  try {
    const hasGrammaticalError = await GPT3(prompt); // checks whether or not there is a grammatical error.
    if (hasGrammaticalError.toLowerCase().includes("yes")) {
      prompt = `Correct this to standard ${language}:\n\n${userResponseInTxt}`;
      correctUserResponseInTxt = await GPT3(prompt); // makes the user response grammatically correct in the same language.
    } else {
      correctUserResponseInTxt = userResponseInTxt;
    }
    return {
      hasGrammaticalError: hasGrammaticalError.toLowerCase().includes("yes")
        ? true
        : false,
      userResponseInTxt,
      correctUserResponseInTxt,
    };
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

module.exports = grammarCheckHandler;
