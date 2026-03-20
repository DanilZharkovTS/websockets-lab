import { configDotenv } from 'dotenv'
import { io } from 'socket.io-client'

configDotenv()

const socket = io(process.env.API_URL)

socket.on('connect', () => {
  socket.emit('joinBlipsChat', { chatId: 2 })
  socket.emit('readBlips', { chatId: 2, content: 'Hello' })

  socket.on('newBlip', () => {
    console.log('New blip has arrived')
  })

  socket.on('readBlips', (data) => {
    console.log('last read blip: ', data.lastReadBlip)
  })
})
