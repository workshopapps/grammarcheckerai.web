const { userCollection, authValidatorSchema } = require('../database/models/userSchema')
const {  findOne } = require("../repository/user.repository");

 async function login (req, res) {
    // retrieve the email and password 
    const { email, password } = req.body;

    const { error } = authValidatorSchema.validate({ email, password });
    if (error) return res.status(400).send(error.details[0].message);

    // check if the email and password exists
    if (!email || !password) {
        return res.status(404).json({ msg: 'Please provide email or password' })
    }
    
    let user = await userCollection.findOne({email});
    
    if (!user) {
        return res.status(401).json({ msg: 'Invalid email or password' })
    }
    // comparing password
    const validPassword = user.comparePassword(password)

    if (!validPassword) {
        return res.status(401).json({ msg: 'Invalid email or password' })
    }
    return res.status(200).json(
        response({
          success: true,
          message: "User login successfully",
          data: user,
        })
      );
}
module.exports = {login}
