const { v4 } = require('uuid')
const mongoose = require('mongoose')
const Joi = require('joi');

let schema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => v4()
    },
    response: {
        type: String,

    },

    language: {
        type: String,
        default: "English"
    },
    timestamps: true
}
)

exports.authCollection = mongoose.model('bot', schema)