const mongoose = require('mongoose')
const { ShortUrl, ShortAnalytics }= require('../dal/models')
/**
 * Cleans up all database models docs.
 * @return {Promise}
 */
 const cleanUpDatabase = async () => Promise.all(Object.values(mongoose.connection.collections).map(collection => collection.deleteMany()))

/**
 * Generate a short url object and store in database
 * @param {String} url 
 * @param {String} identifier 
 * @returns {ShortUrl}
 */
const generateShortUrl = (url,identifier=null) => {

    let shortUrl = new ShortUrl({
        old_url: url,
        new_url: 'https://tier.app/',
        identifier:identifier
    })
    
    if(!identifier){
        //counter as new url
        shortUrl.identifier= shortUrl._id.toString().slice(-6)
        shortUrl.new_url+=shortUrl.identifier
    }
   
    return shortUrl.save()
}

/**
 * Visit a short url
 * @param {mongoose.Types.ObjectId} shortId 
 * @returns {ShortAnalytics}
 */
const visitShortUrl = (shortId) => {
    const shortAnalytics = new ShortAnalytics({
        short_url: shortId
    })
    return shortAnalytics.save()
}

 module.exports = {
    cleanUpDatabase,
    generateShortUrl,
    visitShortUrl
 }