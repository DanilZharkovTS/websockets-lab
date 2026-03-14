import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { controler } from './controller'

configDotenv()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

const server = createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', () => {
  console.log('user is connected')
})

app.get('/blips', controler.getBlips)
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
