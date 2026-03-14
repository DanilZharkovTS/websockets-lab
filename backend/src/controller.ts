import { Request, Response } from 'express'
import { service } from './service'

export const controler = {
  getBlips: async (req: Request, res: Response) => {
    try {
      const result = await service.getBlips()
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json('Server err')
    }
  },
}
