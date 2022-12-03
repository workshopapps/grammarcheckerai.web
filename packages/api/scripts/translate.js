const { Configuration, OpenAIApi } = require("openai");
const { environment } = require("../config/environment");

const configuration = new Configuration({
    apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.translateFromEnglish = async function (botReply, language) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate this into ${language}:\n\n${botReply}\n\n1.`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    return response.data.choices[0].text;
}