
export type BlipStatus = 'sent' | 'read'

export interface Blip {
  id: number
  chat_id: number
  status: BlipStatus
  content: string
  created_at: Date
}