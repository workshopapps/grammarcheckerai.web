const { userCollection } = require("../database/models/userSchema");

async function register(data) {
  try {    
    const user = await userCollection.create(data);
    
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
