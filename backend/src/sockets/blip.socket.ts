import { Server, Socket } from 'socket.io'
import { controler } from '../controller'

export const registerBlipSockets = (io: Server, socket: Socket) => {
  socket.on('joinBlipsChat', (data) => {
    socket.join(`blipsChat:${data.chatId}`)
  })
  socket.on('addBlip', async (data) => {
    await controler.addBlip(io, data)
    console.log('ADDED')
  })
  socket.on('deleteBlip', async (data) => {
    await controler.deleteBlip(io, data.blipId)
    console.log('DELETED')
  })
}
