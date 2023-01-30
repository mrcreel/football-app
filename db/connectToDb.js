require('dotenv').config('./.env')
const { Client } = require('cassandra-driver')

const {
  ASTRA_CLIENT_ID,
  ASTRA_CLIENT_SECRET,
  ASTRA_DB_SECURE_BUNDLE_PATH,
  ASTRA_DB_KEYSPACE
} = process.env

const config = {
  cloud: {
    secureConnectBundle: ASTRA_DB_SECURE_BUNDLE_PATH,
  },
  credentials: {
    username: ASTRA_CLIENT_ID,
    password: ASTRA_CLIENT_SECRET,
  },
  keyspace: ASTRA_DB_KEYSPACE,
}

let session

exports.getSession = () => {

  if (!session) {
    console.log('Creating session...')
    session = new Client(config)
  }

  return session
}