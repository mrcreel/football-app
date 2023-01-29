const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const schoolsList = require('./rawData/schools.json')
const seasonsList = require('./rawData/seasons.json')
const gamesList = require('./rawData/games.json')

const app = express()
const { EXPRESS_PORT } = process.env

app.use(cors())
app.use(morgan('combined'))

app.get('/', (request, response) => {
  response.json({
    message: 'Hello!'
  })
})

app.get('/teams', (request, response) => {
  response.json({
    schoolsList
  })
})

app.get('/seasons', (request, response) => {
  response.json({
    seasonsList
  })
})

app.get('/games', (request, response) => {
  response.json({
    gamesList
  })
})

app.use((request, response, next) => {
  const error = new Error('Not Found')
  response.status(404)
  next(error)
})

app.use((error, request, response, next) => {
  response.status(response.statusCode || 500)
  response.json({
    message: error.message
  })
})

app.listen(EXPRESS_PORT, () => {
  console.log(`Server running on http://localhost:${EXPRESS_PORT}`)
})