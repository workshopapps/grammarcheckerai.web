const { userCollection } = require("../database/models/userSchema");

async function register(data) {
  try {    
    const userData = await userCollection.create(data);

    const user = {
      _id: userData._id,
      firstName: userData.firstName,
      lastName:userData.lastName,
      username: userData.username,
      email: userData.email,
      language:userData.language,
      token: userData.generateAuthToken()
    }
    console.log(user);
    return user;
  } catch (error) { 
    return false;
  }
} 

module.exports = {
  register 
};
