const express = require('express')
const compression = require('compression')
const expressValidator = require('express-validator')
const useragent = require('express-useragent')
const logger = require('./config/logger')
const { loggerMiddleware, errorLoggerMiddleware } = require('./middlewares/http_logger')
const { boomifyErrorsMiddleware, errorHandlerMiddleware } = require('./middlewares/error')
const connectMongoose = require('./config/connectMongoose')
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('trust proxy', true)

// Middlewares
app.use(compression())
app.use(expressValidator())
app.use(express.json())
app.use(useragent.express())
app.use(loggerMiddleware)
app.use(boomifyErrorsMiddleware)
app.use(errorLoggerMiddleware)
app.use(errorHandlerMiddleware)

// add routes
logger.debug('Add health routes')
app.use('/health', require('./routes/health'))
logger.debug('Add url-shortner routes')
app.use('/short', require('./routes/url_shorter'))


app.use('/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

// connect mongoose
connectMongoose()

module.exports={
    app
}  