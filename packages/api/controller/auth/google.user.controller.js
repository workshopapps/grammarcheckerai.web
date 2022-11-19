const { environment } = require("../../config/environment");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_ROOT_URI } = environment;

const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library"); 
const { response } = require("../../utilities/response");

async function googleAuthURL(req, res) {
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };
  const querystring = new URLSearchParams(options);
  res.status(200).json(response({error: `${rootUrl}?${querystring}1`}));
}
module.exports = { googleAuthURL };
