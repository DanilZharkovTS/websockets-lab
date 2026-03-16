import { Request, Response } from 'express'
import { service } from './service'
import {  Server, Socket } from 'socket.io'

export const controler = {
  addBlip: async (socket: Socket, data: { content: string; chatId: number }) => {
    try {
      const result = await service.addBlip(data)
      socket.to(`blipsChat:${data.chatId}`).emit('newBlip', result)
    } catch (err) {
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
  deleteBlip: async (socket: Socket, blipId: number) => {
    try {
      const result = await service.deleteBlip(blipId)
      socket.to(`blipsChat:${result.chatId}`).emit('deleteBlip', { blipId })
    } catch (err) {
      console.log(err)
    }
  },
}
