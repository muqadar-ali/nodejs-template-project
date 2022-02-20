
const { ShortAnalyticsDAL } = require('../dal')

const getCountByShortIdentifier = async(req,res,next) => {
    const identifier = req.params.identifier
    const data = await ShortAnalyticsDAL.getCountByShortIdentifier(identifier)
    return res.send({
        count: data  && data.length > 0 ? data[0].count : 0
    })
} 

module.exports = {
    getCountByShortIdentifier
}