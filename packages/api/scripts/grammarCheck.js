const { Configuration, OpenAIApi } = require("openai");
const { environment } = require("../config/environment");

const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const grammarCheckHandler = async (userResponseInTxt, language = "English") => {
  const prompt = `Correct this to standard ${language}:\n\n${userResponseInTxt}`;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const correctUserResponseInTxt = response.data.choices[0].text.trim(); // extracts the correctUserResponseInTxt and removes leading and trailing white space and line terminator characters.

    const hasGrammaticalError =
      userResponseInTxt.toLowerCase() !==
      correctUserResponseInTxt.toLowerCase(); // checks whether or not there is a grammatical error.
    return {
      hasGrammaticalError,
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
