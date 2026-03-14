import { pool } from './cfg/pool'

export const repo = {
  getAllBlips: () => {
    return pool.query(`SELECT * FROM blips`)
  },
}
