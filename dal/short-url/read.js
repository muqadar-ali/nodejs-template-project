const ShortUrl = require('../models/short_url')

const findById = async (id) => ShortUrl.findById(id)

const findByShortId = async (shortId) => ShortUrl.findOne({ short_id: shortId })

const findByShortURL = async (url) => ShortUrl.findOne({ new_url: url })

const getDuplicatesCount = async () => {
    return ShortUrl.aggregate([
        {
            $group: {
                _id: { name: "$short_id" },
                count: { $sum: 1 }
            }
        },
        {$match: { 
            count: {"$gt": 1}
            }
        }
    ]
    )
}

module.exports = {
    findById,
    findByShortId,
    findByShortURL,
    getDuplicatesCount
}