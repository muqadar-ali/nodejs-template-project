const ShortUrl = require('../models/short_url')

const findById = async (id) => ShortUrl.findById(id)

const findByShort = async (value) => {
    return ShortUrl.findOne({
        $or: [
            { identifier: value },
            { new_url: value }
        ]
    })
}

const getDuplicatesCount = async () => {
    return ShortUrl.aggregate([
        {
            $group: {
                _id: { name: "$identifier" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { "$gt": 1 }
            }
        },
        { $group: { _id: null, total_duplicates: { '$sum': '$count' } } }
    ]
    )
}

module.exports = {
    findById,
    findByShort,
    getDuplicatesCount
}