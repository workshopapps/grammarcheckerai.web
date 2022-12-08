const fetch = require('node-fetch');

async function getTranscription(req, res) {
    //
    console.log(req.body);
    console.log("callback received.")

    const url = `https://api.assemblyai.com/v2/transcript/${req.body.transcript_id}`;

    const params = {
        headers: {
            "authorization": process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        },
        method: 'GET'
    };

    let response = await fetch(url, params);
    let jsonResponse = await response.json();

    console.log(jsonResponse);

    return res.send("Good");
}

module.exports = getTranscription;