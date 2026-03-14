import { configDotenv } from 'dotenv'
import { io } from 'socket.io-client'

configDotenv()

const socket = io(process.env.API_URL)

socket.on('connect', () => {
  console.log('connected:', socket.id)
  socket.emit('deleteBlip', { blipId: 72})
})
