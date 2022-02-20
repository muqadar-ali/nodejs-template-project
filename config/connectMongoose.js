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
  const replSet = await MongoMemoryReplSet.create({
    replSet: { storageEngine: 'wiredTiger' }
  })

  const mongoUri = await replSet.getUri()

  return mongoUri
}

const connectMongoose = async () => {

  if (testMode) {    
    process.env.MONGODB_URI = await getMongoInMemoryServerUri()
  }
  const mongooseConfig = getMongooseConfig()
  return mongoose.connect(process.env.MONGODB_URI, mongooseConfig)
}

module.exports = connectMongoose
