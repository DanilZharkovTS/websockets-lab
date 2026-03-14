import { Server, Socket } from 'socket.io'
import { controler } from '../controller'

export const registerBlipSockets = (io: Server, socket: Socket) => {
  socket.on('addBlip', async (data) => {
    await controler.addBlip(io, data)
  })
}
