'use client'
import { useEffect, useState } from 'react'
import { Blip, IncomingBlipDTO } from './types'
import io from 'socket.io-client'
import { useParams } from 'next/navigation'
import { chatService } from '../service'

let socket

const ChatPage: React.FC = () => {
  const params = useParams()
  const chatId = params.chatId
  const [blips, setBlips] = useState<Blip[] | []>([])

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_API_URL
    socket = io(socketUrl!)

    socket.emit('joinBlipsChat', { chatId: chatId })
    console.log('Joined chat')

    const getChatBlips = async () => {
      try {
        const res = await chatService.getChatBlips(Number(chatId))
        setBlips(res.blips)
      } catch (err) {
        console.error(err)
        return
      }
    }

    socket.on('newBlip', (data: IncomingBlipDTO) => {
      setBlips((prev) => [...prev, data.blip])
    })
    
    getChatBlips()
  }, [chatId])

  return (
    <div>
      {blips?.length === 0 && <div>No blips posted here btw</div>}
      {blips &&
        blips.map((b: Blip) => {
          return (
            <div key={b.id}>
              <div>{b.content}</div>
            </div>
          )
        })}
    </div>
  )
}

export default ChatPage
