const { userCollection} = require('../database/models/userSchema')

exports.userProfile = async (req, res) => {
    //gets user id
    const id = req.params.id;
    try {
        const user = await userCollection.findById(id);
        if (!user) {
            return res.json({
                status: 204,
                error: "No user with that id",
            });
        }
        res.json({Detail: user});
        res.status(200);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

