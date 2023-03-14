import express from 'express'
import dotenv from 'dotenv'

import { schoolsData } from '../rawData/exports.js'
console.log( schoolsData )

const app = express()
app.use( express.json() )
app.use( express.urlencoded( { extended: false } ) )

dotenv.config()
const { PORT } = process.env

app.get( '/', ( req, res ) => {
  res.send( schoolsData )
} )

app.listen( PORT, () => {
  console.log( `Server running on http://localhost:${ PORT }` )
} )