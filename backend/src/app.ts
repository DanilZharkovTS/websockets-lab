import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { controler } from './controller'
import { registerSockets } from './sockets'

configDotenv()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

const server = createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

registerSockets(io) 

app.get('/chats/:chatId', controler.getBlips)
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
