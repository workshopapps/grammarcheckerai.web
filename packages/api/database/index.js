const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { environment } = require("../config/environment.js");

const uri = environment.DATABASE_URI;

exports.client = new MongoClient(uri);

// self-invocation database function

(async function () {
  await mongoose
    .connect(`${uri}`, {
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
