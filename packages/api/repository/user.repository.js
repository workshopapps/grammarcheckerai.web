const {userCollection} = require('../database/models/userSchema')

async function register (data){
    try{
        const user = await userCollection.create(data);
        return user;
    }catch(error){
        //error
    }
}

module.exports ={
    register
}