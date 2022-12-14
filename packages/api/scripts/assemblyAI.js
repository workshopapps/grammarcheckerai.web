const fetch = require("node-fetch");

const { environment } = require("../config/environment");
const { ASSEMBLYAI_API_KEY } = environment;

// time measurement for the whole transcription process
let startTime;
let endTime;

// function to create time delay
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// function upload audio file url to register file for transcription processing which returns the transription process id
exports.uploadFileUrlToInitiateTranscription = async function (
  audioUrl,
  language
) {
  console.log(
    "-------------------- File Registration for transcription started --------------------"
  );
  const url = "https://api.assemblyai.com/v2/transcript";
  const data = {
    audio_url: audioUrl,
    language_code: language,
  };

  const params = {
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  try {
    let response = await fetch(url, params);
    let preTranscriptObject = await response.json();
    return preTranscriptObject.id;
  } catch (error) {
    throw new Error(error);
  }
};

// function to get transcript and metadata from Assembly AI using the unique id provided as argument
exports.getTranscriptionFromAssembly = async function (id) {
  let transcriptStartTime = new Date();
  console.log(
    "-------------------- Transcript download process started ----------------------"
  );
  const url = `https://api.assemblyai.com/v2/transcript/${id}`;

  const params = {
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
    },
    method: "GET",
  };

  // assembly AI returns a response almost immediately after a call is made to the endpoint with status (queued, processing and completed)
  // api calls are repeated when status is not completed
  for (let count = 20; count > 0; count--) {
    try {
      let response = await fetch(url, params);
      let jsonResponse = await response.json();

      if (jsonResponse.status !== "completed") {
        console.log(count);
        await sleep(1000);
      } else if (count === 0) {
        endTime = new Date();
        console.log(
          "transcript download time - success: ",
          (transcriptStartTime - endTime) / 1000
        );
        console.log(
          "Transcription processing time - failed: ",
          (endTime - startTime) / 1000
        );
        throw new Error("Time out! Please try again.");
      } else {
        endTime = new Date();
        console.log(
          "transcript download time - success: ",
          (transcriptStartTime - endTime) / 1000
        );
        console.log(
          "Transcription processing time - success: ",
          (endTime - startTime) / 1000
        );
        return jsonResponse;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};
