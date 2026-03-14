import { repo } from './repo'

export const service = {
  addBlip: async (body: { content: string }) => {
    const blipResult = await repo.addBlip(body.content)
    const dbBlip = blipResult.rows[0]

    return {blip: dbBlip}
  },
  getBlips: async () => {
    const blipsResult = await repo.getAllBlips()
    const dbBlips = blipsResult.rows

    return { blips: dbBlips }
  },
}
