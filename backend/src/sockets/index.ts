import { Server } from "socket.io";
import { registerBlipSockets } from "./blip.socket";

export const registerSockets = (io: Server) => {
  io.on('connection', (socket) => {
    registerBlipSockets(io, socket)
  })
}