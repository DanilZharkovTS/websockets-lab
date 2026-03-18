'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-sm w-full text-center">
        <h1 className="text-xl font-semibold mb-2">
          Welcome to Blips 💬
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Chat anonymously, share thoughts, and explore conversations
        </p>

        <Link
          href="/chats"
          className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm py-2 rounded-xl transition"
        >
          Get started
        </Link>
      </div>
    </div>
  )
}