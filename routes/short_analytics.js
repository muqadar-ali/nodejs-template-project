const express = require('express')
const router = express.Router()
const shortAnalyticsController = require('../controllers/short_analytics')
const { boomifyErrorsMiddleware } = require('../middlewares/error')

router.get('/:identifier', shortAnalyticsController.getCountByShortIdentifier)

router.use(boomifyErrorsMiddleware)

module.exports = router
