import { pool } from './cfg/pool'

export const repo = {
  addBlip: (chatId: number, content: string) => {
    return pool.query(
      `INSERT INTO blips (chat_id, content)
      VALUES ($1, $2)
      RETURNING *`,
      [chatId, content]
    )
  },
  getAllBlips: () => {
    return pool.query(`SELECT * FROM blips`)
  },
  findBlipById: (blipId: number) => {
    return pool.query(
      `SELECT * FROM blips 
      WHERE id = $1`,
      [blipId]
    )
  },
  deleteBlip: (blipId: number) => {
    return pool.query(
      `DELETE FROM blips 
      WHERE id = $1`,
      [blipId]
    )
  },
}
