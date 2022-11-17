import { config } from "dotenv";

config();

export const environment = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE_URI: process.env.DATABASE_URI
};
