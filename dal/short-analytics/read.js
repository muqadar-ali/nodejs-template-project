const ShortAnalytics = require('../models/short_analytics')

const findById = async (id) => ShortAnalytics.findById(id)

const getCountByShortIdentifier = async (identifier) => {
    return ShortAnalytics.aggregate([
        {
            $lookup: {
                from: 'shorturls',
                localField: 'short_url',
                foreignField: '_id',
                as: 'shorturls'
            }
        },
        { $match: { 'shorturls.identifier': identifier } },
        { $group: { _id: null,  count: { $sum: 1 } } }
    ])
}

module.exports = {
    findById,
    getCountByShortIdentifier
}