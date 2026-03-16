import { repo } from './repo'

export const service = {
  addBlip: async (body: { content: string; chatId: number }) => {
    const blipResult = await repo.addBlip(body.chatId, body.content)
    const dbBlip = blipResult.rows[0]

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
}
