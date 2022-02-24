const Help = require('../models/help')

const createHelp = async (_title) => {
  const help = new Help({
    title: _title
  })
  return help.save()
}

module.exports = {
    createHelp
}