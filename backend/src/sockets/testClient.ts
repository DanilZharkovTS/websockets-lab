import { configDotenv } from 'dotenv'
import { io } from 'socket.io-client'

configDotenv()

const socket = io(process.env.API_URL)

socket.on('connect', () => {
  socket.emit('joinBlipsChat', { chatId: 1 })
  socket.emit('leaveBlipsChat', { chatId: 1 })
})
