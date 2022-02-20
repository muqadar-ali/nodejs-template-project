const {request} = require('./utils/app')
const { cleanUpDatabase, generateShortUrl, visitShortUrl } = require('../utils/db')
const { expect } = require('./utils/chai')

describe('GET /analytics/{identifier} - Get number of visits', async () => {
    beforeEach(cleanUpDatabase)

    it('Should return 200 and number of visits=1',async () => {
        const shortUrl = await generateShortUrl('www.google.com')
        await visitShortUrl(shortUrl._id)
        const response = await request.get(`/analytics/${shortUrl.identifier}`)
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            count: 1
        })
    })

    it('Should return 200 and number of visits=0',async () => {
        const shortUrl = await generateShortUrl('www.google.com')
        const response = await request.get(`/analytics/${shortUrl.identifier}`)
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            count: 0
        })
    })

    it('Should return 200 and number of visits=2',async () => {
        const shortUrl = await generateShortUrl('www.google.com')
        await Promise.all([
            visitShortUrl(shortUrl._id),
            visitShortUrl(shortUrl._id)
        ])
        const response = await request.get(`/analytics/${shortUrl.identifier}`)
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({
            count: 2
        })
    })
    


})