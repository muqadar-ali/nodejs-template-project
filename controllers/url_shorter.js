const Boom = require('boom')
const logger = require('../config/logger')
const { ShortUrlDAL } = require('../dal')

const generateShortUrl = async(req,res,next) => {
    const url = req.body.url
    const newShortUrl = await ShortUrlDAL.createShortUrl(url)
    if(!newShortUrl) next(Boom.badRequest('Unable to generate short url'))
    return res.send({
        new_url: newShortUrl.new_url
    })
} 

const getOriginalUrlByShortId = async (req,res,next) => {
    const shortId = req.params.id
    const shortUrl = await ShortUrlDAL.findByShortId(shortId)
    if(!shortUrl) next(Boom.notFound(`url not found by id: ${shortId}`))
    return res.send({
        old_url: shortUrl.old_url
    })
}

const getOriginalUrlByShortUrl = async (req,res,next) => {
    const url = req.query.url
    const shortUrl = await ShortUrlDAL.findByShortURL(url)
    if(!shortUrl) next(Boom.notFound(`original url not found by short url: ${url}`))
    return res.send({
        old_url: shortUrl.old_url
    })
}

const getDuplicatesCount = async (req,res,next) => {
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
