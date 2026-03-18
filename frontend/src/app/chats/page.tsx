'use client'

import Link from 'next/link'

const chats = [
  { id: 1, name: 'Memes ex: 67', emoji: '😂' },
  { id: 2, name: 'Games ex: Roblox', emoji: '🎮' },
  { id: 3, name: 'Life ex: Sybau', emoji: '🌱' },
  { id: 4, name: 'Thoughts ex: 💭', emoji: '🤯' },
]

const ChatsPage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex flex-col">
      <div className="px-4 py-3 border-b border-emerald-500">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold mb-1">Main Blips Chats</h1>
          <p className='text-xs text-gray-400'>(There is lots and lots more of them, ifykyk)</p>
        </div>
        <p className="text-xs text-gray-500">
          Select a chat and join the conversation
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {chats.map((c) => (
          <Link
            key={c.id}
            href={`/chats/${c.id}`}
            className="bg-white hover:bg-emerald-100 cursor-pointer rounded-xl p-3 flex items-center gap-3 shadow-sm transition"
          >
            <div className="text-xl">{c.emoji}</div>
            <div className="flex flex-col">
              <h2 className="font-medium text-sm">{c.name}</h2>
              <p className="text-[10px] text-gray-400">Click to enter chat</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-emerald-500 text-gray-500 text-xs text-center">
        Total chats: Infinity • Stay anonymous, stay creative 💚
      </div>
    </div>
  )
}

export default ChatsPage
