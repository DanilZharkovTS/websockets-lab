import { Server } from 'socket.io'
import { registerBlipSockets } from './blip.socket'

export const registerSockets = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`)

    registerBlipSockets(io, socket)
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`)
    })
  })
}
