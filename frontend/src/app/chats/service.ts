import axios from 'axios'

export const chatService = {
  getChatBlips: async (chatId: number) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`
    )
    return res.data
  },
}
