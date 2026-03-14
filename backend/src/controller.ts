import { Request, Response } from 'express'
import { service } from './service'
import { Server } from 'socket.io'

export const controler = {
  addBlip: async (io: Server, data: { content: string }) => {
    try {
      const result = await service.addBlip(data)
      io.emit('newBlip', result)
    } catch (err) {
      console.log(err)
    }
  },
  getBlips: async (req: Request, res: Response) => {
    try {
      const result = await service.getBlips()
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json('Server err')
    }
  },
  deleteBlip: async (io: Server, blipId: number) => {
    try {
      await service.deleteBlip(blipId)
      io.emit('deleteBlip', { blipId })
    } catch (err) {
      console.log(err)
    }
  },
}
