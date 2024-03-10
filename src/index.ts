import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { MongoClient } from './database/mongo'
import routes from './routers'

const main = async () => {
  config()
  const port = process.env.PORT || 8020
  const app = express()

  app.use(cors())
  app.use(express.json())

  await MongoClient.connect()

  app.use('/api', routes)

  app.listen(port, () => console.log(`App running on port ${port}`))
}

main()
