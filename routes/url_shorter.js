const express = require('express')
const router = express.Router()
const shortUrlController = require('../controllers/url_shorter')
 
router.post('/', shortUrlController.generateShortUrl)
router.get('/duplicates',shortUrlController.getDuplicatesCount)
router.get('/:id', shortUrlController.getOriginalUrlByShortId)
router.get('/', shortUrlController.getOriginalUrlByShortUrl)


module.exports = router
