const {
  uploadFileUrlToInitiateTranscription,
} = require("../scripts/assemblyAI.js");
const fileUploadToS3Bucket = require("./uploadBuffer");

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

async function getBotResponse(req, res) {
  try {
    const userId = req.body.userId;
    const language = req.body.language?.toLowerCase() || "english";
    const audioFile = req.file; // retrieves file buffer and metadata set by multer
    // checks if file is available
    if (!audioFile) {
      return res.status(400).send({
        success: false,
        message: "Please attach an audio file",
      });
    }

    // // 1. If userId, Get user's email
    // const userEmail = userId
    //   ? (await userCollection.findById(userId))?.email
    //   : null;

    // const isSubscriber = userEmail
    //   ? (await Subscription.findOne({ email: userEmail }))?.status
    //   : null;

    // checks if specified language is not available

    if (!languageMap[language]) {
      return res.status(400).send({
        success: false,
        message: "Specified language is not supported",
      });
    }

    // initiate file upload to aws s3 bucket
    let audioUrl = await fileUploadToS3Bucket(audioFile.buffer);

    await uploadFileUrlToInitiateTranscription(audioUrl, language, userId);

    // // 2. Check if user is a premiumm user
    // if ((isSubscriber === 'successful') && Number(transcribedAudio.audio_duration) > 20) {
    //   return res.status(403).send({
    //     success: false,
    //     message: "Recording above 20 seconds is a premium feature. Go Premium!",
    //   });
    // }

    res.status(200).send({
      success: true,
      message: "Waiting for transcription...",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Something went wrong.",
      errorCode: err.code,
      error: err.message,
    });
  }
}

module.exports = { getBotResponse };
