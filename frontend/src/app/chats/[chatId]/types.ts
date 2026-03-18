
export interface Blip {
  id: number
  content: string
  created_at: Date
  chat_id: number
}

export interface IncomingBlipDTO {
  blip: Blip
}