const {request} = require('./utils/app')
const { cleanUpDatabase, generateShortUrl } = require('../utils/db')
const { expect } = require('./utils/chai')

describe('Short url', async () => {
    beforeEach(cleanUpDatabase)

    it('POST /short',async () => {
        const response = await request.post('/short').send({ url: 'https://www.google.com' })
        expect(response).to.have.status(200)
    })

})