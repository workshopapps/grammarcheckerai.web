const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const {development} = require("../config/development")
const uri = development.DATABASE;
exports.client = new MongoClient(uri);


// self-invocation database function

(async function(){
    await mongoose.connect(`${development.DATABASE}/grittybot`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connected 🚀")
    }).catch(err => {
        console.log(err)
    })
})();
