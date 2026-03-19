import { pool } from './cfg/pool'
import { BlipStatus } from './types'

export const repo = {
  addBlip: (chatId: number, content: string) => {
    return pool.query(
      `INSERT INTO blips (chat_id, content)
      VALUES ($1, $2)
      RETURNING *`,
      [chatId, content]
    )
  },
  updateBlipStatusById: (blipId: number, status: BlipStatus) => {
    return pool.query(
      `UPDATE blips
      SET status = $1
      WHERE id = $2
      RETURNING *`,
      [status, blipId]
    )
  },
  findBlipsByChatId: (chatId: number) => {
    return pool.query(
      `SELECT * FROM blips
      WHERE chat_id = $1`,
      [chatId]
    )
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
