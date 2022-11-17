import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { environment } from "../config/environment.js";

const uri = environment.DATABASE_URI;

export const client = new MongoClient(uri);

// self-invocation database function

(async function () {
  await mongoose
    .connect(`${uri}/grittybot`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected 🚀");
    })
    .catch((err) => {
      console.log(err);
    });
})();
