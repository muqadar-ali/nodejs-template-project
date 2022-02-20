const mongoose = require('mongoose')
const shortAnalyticsSchema = new mongoose.Schema({
    short_url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShortUrl',
        required: true
    },
    user_agent: String,
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const ShortAnalytics = mongoose.model('ShortAnalytics', shortAnalyticsSchema)

module.exports = ShortAnalytics