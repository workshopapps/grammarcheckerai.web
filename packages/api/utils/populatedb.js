// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

const { userCollection: User }= require('../database/models/userSchema')

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const  users = []


async function userCreate(email, firstName, lastName, language, password) {
    let userdetail = {email: email, firstName:firstName , lastName: lastName, language: language, password: password}
  
    const user = await  User.create(userdetail)
    console.log('New User: ' + user);
    users.push(user)
}


userCreate('offorifeanayor@gmail.com', 'cholo', 'buzor', 'english', 'classicrm16');
    
//mongoose.connection.close()