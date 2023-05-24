const mongoose = require('mongoose')

const connectDBv0 = async () => {
  const conn = await mongoose.connect(`${process.env.MONGO_URI}/v0?retryWrites=true&w=majority`)
  console.log(`MongoDBv0 Connected: ${conn.connection.host}`.cyan.underline.bold)
}

const connectDBv1 = async () => {
  const conn = await mongoose.connect(`${process.env.MONGO_URI}/v1?retryWrites=true&w=majority`)
  console.log(`MongoDBv1 Connected: ${conn.connection.host}`.yellow.underline.bold)
}

module.exports = {
  connectDBv0,
  connectDBv1
}