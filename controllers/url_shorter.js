const Boom = require('boom')
const { ShortUrlDAL } = require('../dal')
const { ShortAnalyticsDAL } = require('../dal')

const generateShortUrl = async(req,res,next) => {
    const url = req.body ? req.body.url : null

    if(!url) next(Boom.badRequest('Invalid payload'))

    const newShortUrl = await ShortUrlDAL.createShortUrl(url)

    if(!newShortUrl) next(Boom.badRequest('Short url generation failed'))
    
    return res.send({
        new_url: newShortUrl.new_url
    })
} 

const  getOriginalUrlByIdentifier = async (req,res,next) => {
    const identifier = req.params.identifier
    const shortUrl = await ShortUrlDAL.findByShort(identifier)
    
    if(!shortUrl) next(Boom.notFound(`url not found by identifier: ${identifier}`))

    //save analytics
    await ShortAnalyticsDAL.createShortAnalytics({short_url_id: shortUrl._id, user_agent: req.useragent.source})

    return res.send({
        old_url: shortUrl.old_url
    })
}

const  getOriginalUrlByShortUrl = async (req,res,next) => {
    const identifier = req.query.url
    
    const shortUrl = await ShortUrlDAL.findByShort(identifier)
    
    if(!shortUrl) next(Boom.notFound(`url not found by url: ${identifier}`))

    //save analytics
    await ShortAnalyticsDAL.createShortAnalytics({short_url_id: shortUrl._id, user_agent: req.useragent.source})

    return res.send({
        old_url: shortUrl.old_url
    })
}

const getDuplicatesCount = async (req,res,next) => {
    const data = await ShortUrlDAL.getDuplicatesCount()
    
    return res.send({
        count: data  && data.length > 0 ? data[0].total_duplicates : 0
    })
}

module.exports = {
    generateShortUrl,
    getDuplicatesCount,
    getOriginalUrlByIdentifier,
    getOriginalUrlByShortUrl
}
