require("dotenv").config();
const environment = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_SECRET_ID: process.env.LINKEDIN_SECRET_ID,
  LINKEDIN_CALLBACK_URL: process.env.LINKEDIN_CALLBACK_URL,
  LINKEDIN_URL_ENCODED: process.env.LINKEDIN_URL_ENCODED,
  LINKEDIN_ACCESSTOKEN_URL: process.env.LINKEDIN_ACCESSTOKEN_URL,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URI_TEST: process.env.DATABASE_URI_TEST,
  DATABASE_URI_PROD: process.env.DATABASE_URI_PROD,
  DATABASE_URI_DEVELOP: process.env.DATABASE_URI_DEVELOP,
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
  SERVER_ROOT_URI: process.env.SERVER_ROOT_URI,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  FB_CLIENT_ID: process.env.FB_CLIENT_ID,
  FB_CLIENT_SERECT: process.env.FB_CLIENT_SERECT,
  FB_CALLBACK_URL: process.env.FB_CALLBACK_URL,
  FB_CALLBACK_URL_DEV: process.env.FB_CALLBACK_URL_DEV,
  FILE_SIZE: process.env.FILE_SIZE,
  API_KEY: process.env.API_KEY,
  MODEL_KEY: process.env.MODEL_KEY,
  ACCESSKEYID: process.env.ACCESSKEYID,
  S3SECRETEKEY: process.env.S3SECRETEKEY,
  GRITTYBUCKETNAME: process.env.GRITTYBUCKETNAME,
  BASE_URL: process.env.BASE_URL,
  ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  SIGNUP_TEMPLATE_ID: process.env.SIGNUP_TEMPLATE,
  RESET_PASSWORD_TEMPLATE_ID: process.env.RESET_PASSWORD_TEMPLATE_ID,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  DB_HOST: process.env.DB_HOST,
  DIALECT: process.env.DIALECT,
  DB_DB: process.env.DB_DB,
  PASSWORD_CHANGED_TEMPLATE_ID: process.env.PASSWORD_CHANGED_TEMPLATE_ID,
  TEST_EMAIL_TEMPLATE_ID: process.env.TEST_EMAIL_TEMPLATE_ID,
  SENDGRID_EMAIL_FROM: process.env.SENDGRID_EMAIL_FROM,
  FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
  FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
};

module.exports = { environment };
