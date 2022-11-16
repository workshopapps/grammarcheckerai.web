const mongoose = require("mongoose");
let DB_CONNECT = process.env.DB_CONNECT;

module.exports = async function connection() {
  try {
    mongoose.connect(
      DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => {
        if (error) return new Error("Failed to connect to database");
        console.log("Successfuly connected to the database");
      }
    );
  } catch (error) {
    console.log(error);
  }
};