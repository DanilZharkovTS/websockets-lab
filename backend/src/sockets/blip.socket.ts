import { Server, Socket } from 'socket.io'
import { controler } from '../controller'

export const registerBlipSockets = (io: Server, socket: Socket) => {
  socket.on('joinBlipsChat', (data) => {
    socket.join(`blipsChat:${data.chatId}`)
    console.log('joined room')
  })
  socket.on('addBlip', async (data) => {
    await controler.addBlip(io, socket, data)
    console.log('ADDED')
  })
  socket.on('deleteBlip', async (data) => {
    await controler.deleteBlip(io, data.blipId)
    console.log('DELETED')
  })
  socket.on('leaveBlipsChat', (data) => {
    socket.leave(`blipChat:${data.chatId}`)
    console.log('left room')
  })

  socket.on('readBlips', async (data) => {
    await controler.readBlips(io, Number(data.chatId))
    console.log('Read blips')
  })
  socket.on('typing', (data) => {
    controler.startTyping(socket, data.chatId)
    console.log('Start typing')
  })
}
