const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

const NewsLetterCollection = mongoose.model('NewsLetter', schema)

module.exports = NewsLetterCollection;