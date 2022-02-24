const mongoose = require('mongoose')
const helpSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Help = mongoose.model('Help', helpSchema)

module.exports = Help