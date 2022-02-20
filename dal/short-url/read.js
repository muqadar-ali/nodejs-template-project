const ShortUrl = require('../models/short_url')

const findById = async (id) => ShortUrl.findById(id)

const findByShortIdentifier = async (identifier) => ShortUrl.findOne({ identifier: identifier })

const findByShortURL = async (url) => ShortUrl.findOne({ new_url: url })

const getDuplicatesCount = async () => {
    return ShortUrl.aggregate([
        {
            $group: {
                _id: { name: "$identifier" },
                count: { $sum: 1 }
            }
        },
        {$match: { 
            count: {"$gt": 1}
            }
        },
        {$group: {_id: null, total_duplicates: {'$sum': '$count'}}}
    ]
    )
}

module.exports = {
    findById,
    findByShortIdentifier,
    findByShortURL,
    getDuplicatesCount
}