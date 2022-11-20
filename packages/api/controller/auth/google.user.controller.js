const { environment } = require("../../config/environment");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_ROOT_URI } = environment;
const axios = require('axios');

const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const { OAuth2Client } = require("google-auth-library");
const { response } = require("../../utilities/response");

async function googleAuthURL(req, res) {
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/api/v1/auth/google`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const querystring = new URLSearchParams(options);
  res.status(200).json(response({message: `${rootUrl}?${querystring}`}));
}
async function getTokens(code) {
  try {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */ 
    const client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      `${SERVER_ROOT_URI}/api/v1/auth/google`
    );
    
    const {res} = await client.getToken(code);

    const data = {
      id_token: res.data.id_token,
      access_token: res.data.access_token,
    };
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${data.id_token}`,
        },
      }
    );

    return googleUser.data;
  } catch (error) {
    return false
  }
}
module.exports = { googleAuthURL, getTokens };
