const mongoose = require('mongoose')
const shortUrlSchema = new mongoose.Schema({
    old_url: {
        type: String,
        required: true
    },
    new_url: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema)

module.exports = ShortUrl