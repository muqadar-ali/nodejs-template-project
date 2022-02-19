const mongoose = require('mongoose')
const { MongoMemoryReplSet } = require('mongodb-memory-server')

const testMode = process.env.NODE_ENV === 'test'

const getMongooseConfig = () => {
  const config = {
    //useNewUrlParser: true,
    useUnifiedTopology: true,
   // useCreateIndex: true,
   // useFindAndModify: false
  }

  if (testMode) {
    return {
      ...config,
      keepAlive: true,
      serverSelectionTimeoutMS: 100000
    }
  } else {
    return config
  }
}

const getMongoInMemoryServerUri = async () => {
  const replSet = new MongoMemoryReplSet({
    replSet: { storageEngine: 'wiredTiger' }
  })
  await replSet.waitUntilRunning()
  const mongoUri = await replSet.getUri()

  return mongoUri
}

const connectMongoose = async () => {
  let mongoUri

  if (testMode) {
    mongoUri = await getMongoInMemoryServerUri()
  } else {
    mongoUri = process.env.MONGODB_URI
  }

  const mongooseConfig = getMongooseConfig()
  return mongoose.connect(mongoUri, mongooseConfig)
}

module.exports = connectMongoose
