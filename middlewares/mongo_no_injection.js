const Boom = require('boom')
const logger = require('../config/logger')

const NO_SQL_REGEX = /^\$/g

/**
 * validate object that it doesnt contain
 * @param {Object} testObject
 * @returns {Boolean} true if it is a valid object
 * @throws {TypeError}
 */

const __validateNoSqlMongo  = (testObject) => {
  if (testObject instanceof Object) {
    Object.keys(testObject).forEach(function (key) {
      if (NO_SQL_REGEX.test(key)) {
        throw new TypeError('malformed data!')
      } else {
        __validateNoSqlMongo(testObject[key])
      }
    })
  }
  return true
}

const mongoNoInjectionMiddleware  = (req, res, next) => {
  try {
    __validateNoSqlMongo(req.body)
    __validateNoSqlMongo(req.params)
    __validateNoSqlMongo(req.query)
    __validateNoSqlMongo(req.headers)
  } catch (error) {
    logger.error(
      `NoSql injection Attack attemped from source_ip: ${req.ip}, targeted_enpoint: ${
        req.originalUrl
      }, request body: ${JSON.stringify(
        req.body
      )}, request query: ${JSON.stringify(
        req.query
      )}, request params: ${JSON.stringify(
        req.params
      )}, request headers: ${JSON.stringify(req.headers)}`,
      error
    )
     next(Boom.badRequest('malformed data!'))
  }

  next()
}

module.exports = { mongoNoInjectionMiddleware }