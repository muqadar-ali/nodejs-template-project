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
    short_id: {
        type: String,
        required: true
    }
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema)

module.exports = ShortUrl