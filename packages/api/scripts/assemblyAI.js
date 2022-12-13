const fetch = require("node-fetch");

const languageMap = {
  english: "en",
  "english (au)": "en_au",
  "english (uk)": "en_uk",
  "english (us)": "en_us",
  spanish: "es",
  french: "fr",
  german: "de",
  italian: "it",
  portuguese: "pt",
  dutch: "nl",
  hindi: "hi",
  japanese: "ja",
};

// function upload audio file url to register file for transcription processing which returns the transription process id
exports.uploadFileUrlToInitiateTranscription = async function (
  audioUrl,
  language,
  userId
) {
  const url = "https://api.assemblyai.com/v2/transcript";
  const data = {
    audio_url: audioUrl,
    language_code: languageMap[language],
    webhook_url: `https://api.speakbetter.hng.tech/v1/conversation/assemblyAICb?language=${language}&userId=${userId}`,
  };

  const params = {
    headers: {
      authorization: process.env.ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  try {
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
};
