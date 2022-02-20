const express = require('express')
const router = express.Router()
const shortUrlController = require('../controllers/url_shorter')
const { boomifyErrorsMiddleware } = require('../middlewares/error')


router.post('/', shortUrlController.generateShortUrl)
router.get('/duplicates',shortUrlController.getDuplicatesCount)
router.get('/original', shortUrlController.getOriginalUrlByShortUrl)
router.get('/:identifier', shortUrlController.getOriginalUrlByIdentifier)


router.use(boomifyErrorsMiddleware)
module.exports = router
