import express from 'express'
import dotenv from 'dotenv'
import { createClient } from '@astrajs/collections'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

dotenv.config()

const {
  ASTRA_DB_ID,
  ASTRA_DB_REGION,
  ASTRA_DB_APPLICATION_TOKEN,
} = process.env


const astraClient = await createClient({
  astraDatabaseId: ASTRA_DB_ID,
  astraDatabaseRegion: ASTRA_DB_REGION,
  applicationToken: ASTRA_DB_APPLICATION_TOKEN
})

app.get('/', (req, res) => {
  res.send('Index page.')
})

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`)
})