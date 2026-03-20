import { repo } from './repo'
import { Blip } from './types'

export const service = {
  addBlip: async (body: { content: string; chatId: number }) => {
    const blipResult = await repo.addBlip(body.chatId, body.content)
    const dbBlip = blipResult.rows[0]

    if (!dbBlip) {
      throw new Error('Error sending blip')
    }

    return { blip: dbBlip }
  },
  getBlips: async (chatId: number) => {
    const blipsResult = await repo.findBlipsByChatId(chatId)
    const dbBlips = blipsResult.rows

    return { blips: dbBlips }
  },
  deleteBlip: async (blipId: number) => {
    const blipResult = await repo.findBlipById(blipId)
    const dbBlip = blipResult.rows[0]

    if (!dbBlip) return

    await repo.deleteBlip(blipId)
    return dbBlip
  },
  readBlips: async (chatId: number) => {
    const blipsResult = await repo.updateBlipsStatusReadByChatId(chatId)
    const dbBlips: Blip[] = blipsResult.rows

    if (dbBlips.length === 0) {
      return { lastReadBlip: null }
    }

    const lastReadBlip: Blip = dbBlips.reduce((max, blip) => {
      return blip.id > max.id ? blip : max
    }, dbBlips[0]!)

    return { lastReadBlip }
  },
}
