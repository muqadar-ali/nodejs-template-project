const ShortAnalytics = require('../models/short_analytics')

const createShortAnalytics = async (analyticsData) => {
  const shortAnalytics = new ShortAnalytics({
      short_url: analyticsData.short_url_id,
      user_agent: analyticsData.user_agent
  })
  return shortAnalytics.save()
}

module.exports = {
    createShortAnalytics
}