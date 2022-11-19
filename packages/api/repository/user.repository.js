const {userCollection} = require('../database/models/userSchema')

async function register (data){
    try{
        data.password = data.newPassword
        const user = await userCollection.create(data);
        return user;
    }catch(error){
        res.status(500);
        res.json(error.message);
    }
}

module.exports ={
    register
}