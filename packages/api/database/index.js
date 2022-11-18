const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { environment } = require("../config/environment.js");

const { NODE_ENV, DATABASE_URI_DEVELOP, DATABASE_URI_TEST, DATABASE_URI_PROD } =
  environment;

if (NODE_ENV === "development") {
  console.log("Server running in development mode");
  db(DATABASE_URI_DEVELOP);
}
if (NODE_ENV === "test") {
  console.log("Server running in test mode");
  db(DATABASE_URI_TEST);
}
if (NODE_ENV === "production") {
  console.log("Server running in production mode");
  db(DATABASE_URI_PROD);
}

// self-invocation database function
function db(DB_URI) {
  exports.client = new MongoClient(DB_URI);
  (async function () {
    await mongoose
      .connect(`${DB_URI}/grittybot`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database Connected 🚀");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
