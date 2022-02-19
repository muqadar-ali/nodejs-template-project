const ShortUrl = require('../models/short_url')

const createShortUrl = async (url) => {
  let shortUrl = new ShortUrl({
    old_url: url,
    new_url: 'https://tier.app/'
  })
  //counter as new url
  shortUrl.short_id= shortUrl._id.toString().slice(-6)
  shortUrl.new_url+=shortUrl.short_id
  return shortUrl.save()
}

module.exports = {
    createShortUrl
}