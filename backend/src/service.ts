import { repo } from './repo'

export const service = {
  addBlip: async (body: { content: string }) => {
    const blipResult = await repo.addBlip(body.content)
    const dbBlip = blipResult.rows[0]

    return { blip: dbBlip }
  },
  getBlips: async () => {
    const blipsResult = await repo.getAllBlips()
    const dbBlips = blipsResult.rows

    return { blips: dbBlips }
  },
  deleteBlip: async (blipId: number) => {
    const blipResult = await repo.findBlipById(blipId)
    const dbBlip = blipResult.rows[0]

    if (!dbBlip) return

    await repo.deleteBlip(blipId)
    return
  },
}
