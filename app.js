const express = require('express')
const compression = require('compression')
const expressValidator = require('express-validator')
const useragent = require('express-useragent')
const logger = require('./config/logger')
const { mongoNoInjectionMiddleware } = require('./middlewares/mongo_no_injection')
const { loggerMiddleware, errorLoggerMiddleware } = require('./middlewares/http_logger')
const { boomifyErrorsMiddleware, errorHandlerMiddleware } = require('./middlewares/error')
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const Boom = require('boom')

// Connect to MongoDB.
require('./config/mongoose')

const app = express()
app.set('port', process.env.PORT || 3000)

// // Middlewares
app.use(compression())
app.use(expressValidator())
app.use(mongoNoInjectionMiddleware)
app.use(express.json())
app.use(loggerMiddleware)
app.use(useragent.express())

// add routes
logger.debug('Add health routes')
app.use('/health', require('./routes/health'))
logger.debug('Add url-shortner routes')
app.use('/short', require('./routes/url_shorter'))
logger.debug('Add short analytics routes')
app.use('/analytics', require('./routes/short_analytics'))

// add swagger documentation
app.use('/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

logger.debug('Adding error handles')
 app.use(boomifyErrorsMiddleware)
 app.use(errorLoggerMiddleware)
 app.use(errorHandlerMiddleware)


module.exports={ app }  