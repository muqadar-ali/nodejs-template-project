const Boom = require('boom')
const { HelpDAL } = require('../dal')

const createHelp = async(req,res,next) => {
    const title = req.body ? req.body.title : null

    if(!title) next(Boom.badRequest('Invalid payload'))

    const newHelp = await HelpDAL.createHelp(title)

    if(!newHelp) next(Boom.badRequest('create help failed'))
    
    return res.send({
        title: title,
        id: newHelp._id,
        created_at: newHelp.created_at
    })
} 

const getHelpById = async(req,res,next) => {
    const id = req.params.id

    const help = await HelpDAL.findById(id)

    if(!help) next(Boom.notFound('Help not found'))
    
    return res.send(help)
} 

module.exports = {
    createHelp,
    getHelpById
}
