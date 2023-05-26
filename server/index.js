require( 'dotenv' ).config()
const colors = require('colors')
const express = require( 'express' )

const {
  connectDBv0
} = require('./config/db')

const { graphqlHTTP } = require( 'express-graphql' )
const schema = require( './schema/schema' )

const v0 = connectDBv0()

const port = process.env.PORT || 5000
const app = express()
app.all(
  '/graphql',
  graphqlHTTP( {
    schema,
    graphiql: process.env.NODE_ENV === 'development'
  } )
)

app.listen(
  port,

  console.log( `
  GraphQL server running on http://localhost:${ port }/graphql
  `.blue.bold )
)