import axios from 'axios'
import { Socket } from 'dgram'

export const chatService = {
  getChatBlips: async (chatId: number) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`
    )
    return res.data
  },
}
