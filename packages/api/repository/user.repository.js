const { userCollection } = require("../database/models/userSchema");

async function register(data) {
  try {
    
    const newUser = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      language: data.language,
    };
    
    const user = await userCollection.create(newUser);
    
    return user;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
async function findOne(Collection, value) {
  try {
    const row = await Collection.findOne({ value });
    return row;
  } catch (error) {
    return false;
  }
}

module.exports = {
  register,
  findOne,
};
