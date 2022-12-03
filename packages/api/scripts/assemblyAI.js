const fetch = require('node-fetch');

const { environment } = require('../config/environment');
const { ASSEMBLYAI_API_KEY } = environment;

// time measurement for the whole transcription process
let startTime;
let endTime;

// time measurement for the file upload process
let fileUploadStartTime;
let fileUPloadEndTime;


// function to create time delay
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

// function to upload audio file buffer to Assembly AI memory storage and exhange for url
exports.uploadFileForURL = async function (bufferData) {
    startTime = new Date();
    fileUploadStartTime = new Date();

    console.log("-------------------- File Upload to Assembly AI Started --------------------");
    const url = 'https://api.assemblyai.com/v2/upload';

    const params = {
        headers: {
            "authorization": ASSEMBLYAI_API_KEY,
            "Transfer-Encoding": "chunked"
        },
        body: bufferData,
        method: 'POST'
    };
    

    try {
        let response = await fetch(url, params);
        let urlObject = await response.json();
        fileUPloadEndTime = new Date;
        console.log("File upload processing time - success: ", (fileUploadStartTime - fileUPloadEndTime)/1000);
        return urlObject.upload_url;
    } catch (error) {
        fileUPloadEndTime = new Date;
        console.log("File upload processing time - failed: ", (fileUploadStartTime - fileUPloadEndTime)/1000);
        console.error(`Error: ${error}`);
    }
}

// function upload audio file url to register file for transcription processing which returns the transription process id
exports.uploadFileUrlToInitiateTranscription = async function (audioUrl, language) {
    console.log("-------------------- File Registration for transcription started --------------------");
    const url = 'https://api.assemblyai.com/v2/transcript';
    const data = { 
        "audio_url": audioUrl,
        "language_code": language
     };

    const params = {
        headers: {
            "authorization": process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST"
    };

    try {
        let response = await fetch(url, params);
        let preTranscriptObject = await response.json();
        return preTranscriptObject.id;
    } catch (error) {
        throw new Error(error);
    }
}

// function to get transcript and metadata from Assembly AI using the unique id provided as argument
exports.getTranscriptionFromAssembly = async function (id) {
    let transcriptStartTime = new Date();
    console.log("-------------------- Transcript download process started ----------------------")
    const url = `https://api.assemblyai.com/v2/transcript/${id}`;

    const params = {
        headers: {
            "authorization": process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        },
        method: 'GET'
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
                console.log("transcript download time - success: ", (transcriptStartTime - endTime)/1000);
                console.log("Transcription processing time - failed: ", (endTime - startTime)/1000);
                throw new Error("Time out! Please try again.");
            } else {
                endTime = new Date();
                console.log("transcript download time - success: ", (transcriptStartTime - endTime)/1000);
                console.log("Transcription processing time - success: ", (endTime - startTime)/1000);
                return jsonResponse.text;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}