const mongoose = require('mongoose')
const { ShortUrl, ShortAnalytics }= require('../dal/models')
/**
 * Cleans up all database models docs.
 * @return {Promise}
 */
 const cleanUpDatabase = async () => Promise.all(Object.values(mongoose.connection.collections).map(collection => collection.deleteMany()))


const generateShortUrl = (url) => {

    let shortUrl = new ShortUrl({
        old_url: url,
        new_url: 'https://tier.app/',
        identifier:''
    })
    //counter as new url
    shortUrl.identifier= shortUrl._id.toString().slice(-6)
    shortUrl.new_url+=shortUrl.identifier
    return shortUrl.save()
}

 module.exports = {
    cleanUpDatabase,
    generateShortUrl
 }