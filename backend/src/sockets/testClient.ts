import { configDotenv } from 'dotenv'
import { io } from 'socket.io-client'

configDotenv()

const socket = io(process.env.API_URL)

socket.on('connect', () => {
  socket.emit('joinBlipsChat', { chatId: 2 })
  socket.emit('addBlip', { chatId: 2, content: 'Helo lalal' })

  socket.on('newBlip', () => {
    console.log('New blip has arrived')
  })
})
