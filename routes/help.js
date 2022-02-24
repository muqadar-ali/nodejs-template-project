const express = require('express')
const router = express.Router()
const helpController = require('../controllers/help')
const { boomifyErrorsMiddleware } = require('../middlewares/error')


router.post('/', helpController.createHelp)
router.get('/:id',helpController.getHelpById)

router.use(boomifyErrorsMiddleware)
module.exports = router
