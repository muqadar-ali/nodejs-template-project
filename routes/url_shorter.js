const express = require('express')
const router = express.Router()
const shortUrlController = require('../controllers/url_shorter')
 
router.post('/', shortUrlController.generateShortUrl)
router.get('/:id', shortUrlController.getOriginalUrlByShort)
router.get('/',shortUrlController.getDuplicatesCount)

module.exports = router
