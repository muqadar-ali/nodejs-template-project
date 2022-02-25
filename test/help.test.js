const {request} = require('./utils/app')
const { cleanUpDatabase, createHelp  } = require('../utils/db')
const { expect } = require('./utils/chai')
const { default: mongoose } = require('mongoose')

describe('POST /help - Create help', async () => {
    beforeEach(cleanUpDatabase)

    it('Should return 200 and create help',async () => {
        const response = await request.post('/help').send({ title: 'test case /help sample title' })
        expect(response).to.have.status(200)
        expect(response.body).to.have.property('title')
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('created_at')
    })

    it('Should return 400 for empty request body',async () => {
        const response = await request.post('/help')
        expect(response).to.have.status(400)
        expect(response.body.message).to.be.equal('Invalid payload')
    })

    it('Should return 400 for incorrect request body',async () => {
        const response = await request.post('/help').send({abc:'def'})
        expect(response).to.have.status(400)
        expect(response.body.message).to.be.equal('Invalid payload')
    })
    
})

describe('GET /help/{id} - Get help by id', async () => {
    beforeEach(cleanUpDatabase)

    it('Should return 200 and help item by id',async () => {
        const help = await createHelp('hello help')
        const response = await request.get('/help/'+help._id.toString())
        expect(response).to.have.status(200)
        expect(response.body.title).to.deep.equal(help.title)
        expect(response.body._id.toString()).to.deep.equal(help._id.toString())

    })

    it('Should return 404 for incorrect id',async () => {
        await Promise.all([
            createHelp('www.google.com'),
            createHelp('www.google.com1')
        ])
        const response = await request.get('/help/'+mongoose.Types.ObjectId.toString())
        expect(response).to.have.status(404)
    })
    
})
