const Help = require('../models/help')

const findById = async (id) => Help.findById(id)

const findByTitle = async (title) => Help.findOne({title: title})

module.exports = {
    findById,
    findByTitle
}