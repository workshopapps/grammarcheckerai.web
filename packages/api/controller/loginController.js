const { userCollection, authValidatorSchema } = require('../database/models/userSchema')

exports.login = async (req, res) => {
    // retrieve the email and password 
    const { email, password } = req.body;

    const { error } = authValidatorSchema.validate({ email, password });
    if (error) return res.status(400).send(error.details[0].message);

    // check if the email and password exists
    if (!email || !password) {
        return res.status(404).json({ msg: 'Please provide email or password' })
    }

    let user = await userCollection.findOne({ email })
    if (!user) {
        return res.status(401).json({ msg: 'Invalid email or password' })
    }
    // comparing password
    const validPassword = user.comparePassword(password)

    if (!validPassword) {
        return res.status(401).json({ msg: 'Invalid email or password' })
    }

    const token = user.generateAuthToken()

    return res.status(200).json({
        user: {
            pageTitle: "login endpoint",
            name: user.name,
            message: "login successful",
            token
        }
    })
}

