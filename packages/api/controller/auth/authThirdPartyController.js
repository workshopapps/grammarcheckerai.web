const { OAuth2Client } = require("google-auth-library");
const { response, authResponse } = require("../../utilities/response");
const { environment } = require("../../config/environment");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  LINKEDIN_URL_ENCODED,
  LINKEDIN_CALLBACK_URL,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_SECRET_ID,
  FB_CLIENT_ID,
  FB_CLIENT_SERECT,
} = environment;
const Axios = require("axios");
const querystring = require("query-string");
const { userCollection } = require("../../database/models/userSchema");
const { register } = require("../../repository/user.repository");
const { slugify } = require("../../utilities/compare");

const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

async function googleAuthURL(req, res) {
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}`,
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
  res.status(200).json(response({ message: `${rootUrl}?${querystring}` }));
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
      `${SERVER_ROOT_URI}`
    );

    const { res } = await client.getToken(code);

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
    return false;
  }
}

const getLinkedinUrl = (req, res) => {
  return res
    .status(200)
    .json(
      response({
        message: "LinkedIn URL",
        success: true,
        data: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=r_liteprofile%20r_emailaddress&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_URL_ENCODED}`,
      })
    );
};

/*
 * Uses the code to get tokens
 * that can be used to fetch the user's profile
 */
const getLinkedinAccessToken = async ({
  code,
  clientId,
  clientSecret,
  redirectUri,
}) => {
  const url = "https://api.linkedin.com/oauth/v2/accessToken";

  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  const res_value = await Axios({
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: querystring.stringify(values),
  }).catch((error) => {
    console.log(`Failed to fetch auth tokens`);
    console.error(error);
  });

  if (!res_value) {
    return null;
  }
  return res_value.data;
};

const linkedinAccessToken = async (req, res) => {
  const { code } = req.query;
  try {
    if (!code) {
      return true;
    }

    const token = await getLinkedinAccessToken({
      code,
      redirectUri: LINKEDIN_CALLBACK_URL,
      clientId: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_SECRET_ID,
    });

    const linkedinUserEmail = await Axios({
      method: "GET",
      url: `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }).catch((error) => {
      console.error(`Failed to fetch details`);
      console.log(error);
    });

    const linkedinUser = await Axios({
      method: "GET",
      url: `https://api.linkedin.com/v2/me`,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }).catch((error) => {
      console.log(`Failed to fetch details`);
    });

    const email = linkedinUserEmail.data.elements[0]["handle~"].emailAddress;

    //check if user exist then login
    const existing_user = await userCollection.findOne({ email });

    if (existing_user) {
      return res
        .status(200)
        .json(
          response({
            success: true,
            message: "User login successfully",
            data: authResponse(existing_user),
          })
        );
    }

    // create user
    const fullName = `${linkedinUser.data.localizedFirstName} ${linkedinUser.data.localizedLastName}`;
    const randomUserCode = (Math.random() + 1).toString(36).substring(7);

    const data = {
      firstName: linkedinUser.data.localizedFirstName,
      lastName: linkedinUser.data.localizedLastName,
      email,
      username: slugify(fullName) + randomUserCode,
      password: null,
    };
    const user = await register(data);

    if (!user)
      return res
        .status(500)
        .json(response({ success: false, message: "User not created" }));

    return res.status(201).json(
      response({
        success: true,
        message: "User created successfully",
        data: user,
      })
    );
  } catch (error) {
    return res.status(500).json(
      response({
        message: "Something went wrong wile processing this request",
        success: false,
      })
    );
  }
};

module.exports = {
  googleAuthURL,
  getTokens,
  getLinkedinUrl,
  linkedinAccessToken,
};
