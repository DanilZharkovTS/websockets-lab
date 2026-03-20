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
  updateBlipsStatusReadByChatId: (chatId: number) => {
    return pool.query(
      `UPDATE blips
      SET status = 'read'
      WHERE chat_id = $1
      AND status != 'read'
      RETURNING *`,
      [chatId]
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
