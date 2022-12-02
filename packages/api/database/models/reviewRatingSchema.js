const mongoose = require('mongoose')
const { v4 } = require("uuid");

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => v4(),
        },
        userid: {
            type: String,
            ref: "user"
        },
        ratings: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        conversation_id: {
            type: String,
            ref: "conversation"
        },
        comment: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const Rating = mongoose.model("Rating", schema)

module.exports = Rating;