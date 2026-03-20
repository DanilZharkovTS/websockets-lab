'use client'
import { useEffect, useRef, useState } from 'react'
import { Blip, IncomingBlipDTO, IncomingLastReadBlipDTO } from './types'
import io, { Socket } from 'socket.io-client'
import { useParams } from 'next/navigation'
import { chatService } from '../service'

const ChatPage: React.FC = () => {
  const params = useParams()
  const chatId = Number(params.chatId)
  const refSocket = useRef<typeof Socket | null>(null)
  const [blips, setBlips] = useState<Blip[] | []>([])

  const [contentInput, setContentInput] = useState<string>('')

  useEffect(() => {
    if (typeof chatId !== 'number') return

    const socketUrl = process.env.NEXT_PUBLIC_API_URL
    const socket = io(socketUrl!)
    refSocket.current = socket

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

    getChatBlips()

    socket.emit('readBlips', { chatId })

    const handleReadBlips = (data: IncomingLastReadBlipDTO) => {
      const lastReadBlipId = data.lastReadBlip?.id
      if (lastReadBlipId) {
        setBlips((prev) =>
          prev.map((b) =>
            b.id <= lastReadBlipId && b.status !== 'read'
              ? { ...b, status: 'read' }
              : b
          )
        )
      }
    }

    const handleNewBlip = (data: IncomingBlipDTO) => {
      console.log('new blip')

      setBlips((prev) => [...prev, data.blip])
    }

    socket.on('readBlips', handleReadBlips)

    socket.on('newBlip', handleNewBlip)

    return () => {
      socket.off('readBlips', handleReadBlips)
      socket.off('newBlip', handleNewBlip)
      socket.emit('leaveBlipsChat', { chatId })
      console.log('left chat')
    }
  }, [chatId])

  const handleBlipAdd = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (contentInput.length < 1) return

    refSocket.current?.emit('addBlip', { chatId, content: contentInput })
    setContentInput('')
  }

  return (
    <div className="h-screen flex flex-col text-white">
      <div className="px-4 py-3 border-b border-emerald-500 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Blips Chat</h1>
          <p className="text-xs text-zinc-400">Anonymous</p>
        </div>

        <div className="text-xs text-zinc-400">online</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {blips?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <div className="text-4xl mb-2">💬</div>
            <div>No blips yet</div>
            <div className="text-xs">be the first...</div>
          </div>
        )}

        {blips?.map((b: Blip) => (
          <div
            key={b.id}
            className="self-start bg-emerald-800 px-4 py-2 rounded-2xl max-w-[70%] shadow"
          >
            <div className="text-sm">{b.content}</div>

            <div className="text-[10px] text-zinc-200 mt-1">
              {new Date(b.created_at).toLocaleTimeString()}
            </div>
            <div>{b.status}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleBlipAdd}
        className="p-3 border-t border-emerald-500"
      >
        <div className="flex gap-2">
          <input
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            placeholder="Type something..."
            className="flex-1 rounded-xl px-3 py-2 text-sm text-black outline-none border border-gray-200  focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 px-4 rounded-xl text-sm hover:bg-emerald-500 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatPage
