import { repo } from './repo'

export const service = {
  getBlips: async () => {
    const blipsResult = await repo.getAllBlips()
    const dbBlips = blipsResult.rows

    return { blips: dbBlips }
  },
}
