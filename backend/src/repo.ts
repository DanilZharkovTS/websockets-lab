import { pool } from './cfg/pool'

export const repo = {
  addBlip: (content: string) => {
    return pool.query(
      `INSERT INTO blips (content)
      VALUES ($1)
      RETURNING *`,
      [content]
    )
  },
  getAllBlips: () => {
    return pool.query(`SELECT * FROM blips`)
  },
}
