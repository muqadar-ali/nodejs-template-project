const { ShortUrlDAL } = require('../dal')

const generateShortUrl = async(req,res) => {
    const url = req.body.url
    const newShortUrl = await ShortUrlDAL.createShortUrl(url)
    return res.send({
        new_url: newShortUrl.new_url
    })
} 

const getOriginalUrlByShortId = async (req,res) => {
    const shortId = req.params.id
    const shortUrl = await ShortUrlDAL.findByShortId(shortId)
    return res.send({
        old_url: shortUrl.old_url
    })
}

const getOriginalUrlByShortUrl = async (req,res) => {
    const url = req.query.url
    const shortUrl = await ShortUrlDAL.findByShortURL(url)
    return res.send({
        old_url: shortUrl.old_url
    })
}

const getDuplicatesCount = async (req,res) => {
    const records = await ShortUrlDAL.getDuplicatesCount()
    return res.send({
        count: records ? records.length : 0
    })
}

module.exports = {
    generateShortUrl,
    getOriginalUrlByShortId,
    getDuplicatesCount,
    getOriginalUrlByShortUrl
}
