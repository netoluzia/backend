import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { MongoClient } from './database/mongo'
import routes from './routers'
import { Socket, Server as SocketIOServer } from 'socket.io'
import http from 'http'

const main = async () => {
  config()
  const port = process.env.PORT || 8020
  const app = express()
  const server = http.createServer(app)
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: '*',
    },
  })
  app.set('io', io)
  app.use(cors({ origin: '*', methods: '*' }))
  app.use(express.json())

  // await MongoClient.connect()

  app.use('/api', routes)
  io.on('connection', (socket: Socket) => {
    console.log('Conectado')
  })
  app.use((req, res) => {
    res.send()
  })
  server.listen(port, () => console.log(`App running on port ${port}`))
}

main()
