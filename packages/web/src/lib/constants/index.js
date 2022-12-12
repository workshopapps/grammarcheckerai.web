export const ENDPOINTS = {
  API_BASE_URL: 'https://api.speakbetter.hng.tech/v1/',
  API_BASE_HTTP_URL: 'http://api.speakbetter.hng.tech/v1/',
  API_BASE_HTTPS_URL: 'https://api.speakbetter.hng.tech/v1/',
  API_AUTH_LOGIN: 'auth/login',
  API_INITIATE_SIGNUP: 'auth/signup',
  API_GET_PROFILE: 'user/profile',
  API_SEND_AUDIO: 'conversation/sendAudio',
  API_AUTH_GOOGLE: 'auth/google',
  API_AUTH_LINKEDIN: 'auth/linkedin',
  API_AUTH_POST_LINKEDIN: (params) => `auth/linkedin/callback${params}`,
  API_AUTH_POST_GOOGLE: (params) => `auth/google/${params}`,
  API_BASE_PAYSTACK_URL: 'https://api.paystack.co/',
  API_AUTH_FACEBOOK: 'auth/facebook',
  API_AUTH_POST_FACEBOOK: (params) => `auth/facebook/callback${params}`,
  API_PAYSTACK_URL: 'paystack',
  API_PREMIUM_PAY: 'paystack/create',
  API_PREMIUM_VERIFY: (email, txref) => `paystack/verify?email=${email}&txref=${txref}`,
  API_PREMIUM_CANCEL: 'paystack/cancel',
  API_AUTH_FORGOT_PASSWORD: 'auth/request-password-reset',
  API_STRIPE_PAY: 'stripe/checkout',
  API_STRIPE_VERIFY: 'stripe/verify',
  API_AUTH_RESET_PASSWORD: (token) => `auth/password-reset?token=${token}`,
  API_USER_SUBSCRIPTION: (email) => `paystack?email=${email}`,
  API_USER_PROFILE: (userId) => `user/profile/${userId}`,

  API_STATUS_URL: 'test',
};

// http://api.speakbetter.hng.tech/v1/auth/password-reset?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyZTQ4MDcyZC05NjIxLTRmNzYtYTQ5NS0xYzk1OGNhMGZjYmIiLCJlbWFpbCI6Im9nbWFyb0BnbWFpbC5jb20iLCJpYXQiOjE2Njk5NzM0NDcsImV4cCI6MTY3MDIzMjY0N30.5eFreMaOMwtbF_ZqsuSrVA9cIArw4yJUcs99At2cUTY
// https://speakbetter.hng.tech/reset-password
// https://speakbetter.hng.tech/reset-password?token=ejdsjhdgsjhdgshjdgshjdvnsbvbnsvchjsvchjscsc
// http://speakbetter.hng.tech/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyZTQ4MDcyZC05NjIxLTRmNzYtYTQ5NS0xYzk1OGNhMGZjYmIiLCJlbWFpbCI6Im9nbWFyb0BnbWFpbC5jb20iLCJpYXQiOjE2NzAwMjYwNTgsImV4cCI6MTY3MDI4NTI1OH0.Bo_5rvJ69ipN2tjwgWsP5XRQbsuK6YDXjrE9fJ6Ir-k
// {
//     "new_password": "newPAss",
//     "confirm_password": "newPAss"
// }
