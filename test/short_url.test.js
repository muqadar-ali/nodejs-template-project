const {request} = require('./utils/app')
const { cleanUpDatabase, generateShortUrl } = require('../utils/db')
const { expect } = require('./utils/chai')

describe('POST /short - Generate short url', async () => {
    beforeEach(cleanUpDatabase)

    it('Should return 200 and generate short url',async () => {
        const response = await request.post('/short').send({ url: 'https://www.google.com' })
        expect(response).to.have.status(200)
        expect(response.body).to.have.key('new_url')
    })

    it('Should return 400 for empty request body',async () => {
        const response = await request.post('/short')
        expect(response).to.have.status(400)
        expect(response.body.message).to.be.equal('Invalid payload')
    })

    it('Should return 400 for incorrect request body',async () => {
        const response = await request.post('/short').send({abc:'def'})
        expect(response).to.have.status(400)
        expect(response.body.message).to.be.equal('Invalid payload')
    })
    
})

describe('GET /short/{identifier} - Get original url', async () => {
    beforeEach(cleanUpDatabase)

    it('Should return 200 and original url by short identifier',async () => {
        const shortUrl = await generateShortUrl('www.google.com')
        const response = await request.get('/short/'+shortUrl.identifier)
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            old_url: shortUrl.old_url
        })
    })

    it('Should return 404 for incorrect identifier',async () => {
        await Promise.all([
            generateShortUrl('www.google.com'),
            generateShortUrl('www.facebook.com')
        ])
        const identifier='tierappgoogleabc'
        const response = await request.get('/short/'+identifier)
        expect(response).to.have.status(404)
        expect(response.body.message).to.be.equal(`url not found by identifier: ${identifier}`)
    })
    
})

describe('GET /short/original - Get original url', async () => {
    beforeEach(cleanUpDatabase)

    it('Should return 200 and original url by short url',async () => {
        const shortUrl = await generateShortUrl('www.google.com')
        const response = await request.get('/short/original?url='+shortUrl.new_url)
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            old_url: shortUrl.old_url
        })
    })

    it('Should return 404 for incorrect short url',async () => {
        await Promise.all([
            generateShortUrl('www.google.com'),
            generateShortUrl('www.facebook.com')
        ])
        const identifier='www.google1.com'
        const response = await request.get('/short/original?url='+identifier)
        expect(response).to.have.status(404)
        expect(response.body.message).to.be.equal(`url not found by url: ${identifier}`)
    })

    it('Should return 404 for empty short url',async () => {
        await Promise.all([
            generateShortUrl('www.google.com'),
            generateShortUrl('www.facebook.com')
        ])
        const identifier=undefined
        const response = await request.get('/short/original')
        expect(response).to.have.status(404)
        expect(response.body.message).to.be.equal(`url not found by url: ${identifier}`)
    })
    
})

describe('GET /short/duplicates - Verify uniqueness', async () => {
    beforeEach(cleanUpDatabase)

    it('Should return 200 and duplicate count=0',async () => {
        const shortUrl = await generateShortUrl('www.google.com')
        const response = await request.get('/short/duplicates')
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            count: 0
        })
    })

    it('Should return 200 and duplicate count=2',async () => {
        await Promise.all([
            generateShortUrl('www.google.com','123456'),
            generateShortUrl('www.facebook.com','123456')
        ])
        const response = await request.get('/short/duplicates')
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            count: 2
        })
    })

    it('Should return 200 and duplicate count=0 for 1000 requests ',async () => {
        for(let i=0; i< 1000; ++i){
            await generateShortUrl('www.google.com')
        }
        const response = await request.get('/short/duplicates')
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            count: 0
        })
    })

    
})