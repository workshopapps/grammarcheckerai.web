<<<<<<< HEAD
import dotenv from "dotenv";
dotenv.config();

export const environment = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE_URI: process.env.DATABASE_URI,
=======
import { config } from "dotenv";

config();

export const environment = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE_URI: process.env.DATABASE_URI
>>>>>>> 56e3a4c (Quick fix database schema)
};
