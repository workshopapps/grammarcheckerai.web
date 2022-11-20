const {userResponsecollection} = require('../database/models/userResponseSchema')

exports.history = async (req, res) =>{
    const {userId} = req.params
    let history = await userResponsecollection.find({ userId })
    if (!history){
        return res.status(401).json({ message: "No history available"})
    }
    return res.status(200).json({
        correctionHistory : history,
        pageTitle: "correction history endpoint",
        status: "success"
    })
}