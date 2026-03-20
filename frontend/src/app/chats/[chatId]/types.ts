export type BlipStatus = 'pending' | 'sent' | 'read' | 'failed'

export interface Blip {
  id: number
  content: string
  created_at: Date
  chat_id: number
  status: BlipStatus
}

export interface IncomingBlipDTO {
  blip: Blip
}

export interface IncomingLastReadBlipDTO {
  lastReadBlip: Blip
} 