import { Request, Response } from 'express'
import { service } from './service'
import { Server, Socket } from 'socket.io'

export const controler = {
  addBlip: async (
    io: Server,
    socket: Socket,
    data: { content: string; chatId: number }
  ) => {
    try {
      const result = await service.addBlip(data)
      io.to(`blipsChat:${data.chatId}`).emit('newBlip', result)
    } catch (err) {
      socket.emit('failBlip')
      console.log(err)
    }
  },
  getBlips: async (req: Request, res: Response) => {
    try {
      const result = await service.getBlips(Number(req.params.chatId))
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json('Server err')
    }
  },
  deleteBlip: async (io: Server, blipId: number) => {
    try {
      const result = await service.deleteBlip(blipId)
      io.to(`blipsChat:${result.chatId}`).emit('deleteBlip', { blipId })
    } catch (err) {
      console.log(err)
    }
  },
  readBlips: async (io: Server, chatId: number) => {
    try {
      const result = await service.readBlips(chatId)
      io.to(`blipsChat:${chatId}`).emit('readBlips', result)
    } catch (err) {
      console.log(err)
    }
  },
  startTyping: (socket: Socket, chatId: number) => {
    try {
      socket.to(`blipsChat:${chatId}`).emit('typing')
    } catch (err) {
      console.log(err)
    }
  },
  stopTyping: (socket: Socket, chatId: number) => {
    try {
      socket.to(`blipsChat:${chatId}`).emit('stopTyping')
    } catch (err) {
      console.log(err)
    }
  },
}
