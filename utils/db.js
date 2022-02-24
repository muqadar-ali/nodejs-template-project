const mongoose = require('mongoose')
const { Help }= require('../dal/models')
/**
 * Cleans up all database models docs.
 * @return {Promise}
 */
 const cleanUpDatabase = async () => Promise.all(Object.values(mongoose.connection.collections).map(collection => collection.deleteMany()))

/**
 * Create new help
 * @param {String} title 
 * @returns {Help}
 */
 const createHelp = async (_title) => {
    const help = new Help({
      title: _title
    })
    return help.save()
  }
  
 module.exports = {
    cleanUpDatabase,
    createHelp
 }