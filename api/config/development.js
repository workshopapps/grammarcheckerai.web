require('dotenv').config()

exports.development = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    POSTMARK_API_KEY: process.env.POSTMARK_API_KEY,
    SECRET: process.env.SECRET,
    FRONTEND_HOST:process.env.FRONTEND_HOST
}