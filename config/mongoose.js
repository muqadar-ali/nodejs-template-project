const mongoose = require('mongoose')
const connectMongoose = require('./connectMongoose')
const logger = require('./logger')

mongoose.Promise = Promise

connectMongoose()

mongoose.set('debug', process.env.MONGOOSE_DEBUGER === 'true')
// CONNECTION EVENTS
mongoose.connection.once('open', () => {
  logger.info('Mongoose default connection connected')
})

mongoose.connection.on('error', err => {
  logger.error('Mongoose default connection error ', err)
  process.exit(1)
})

// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${process.env.MONGODB_URI}`)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

module.exports = mongoose
