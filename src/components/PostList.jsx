"use client"

import { useState } from "react"
import PostCard from "./PostCard"

export default function PostList({ initialPosts }) {
  const [posts] = useState(initialPosts)

  const [query, setQuery] = useState("")

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div className="max-w-md mx-auto sm:mx-0">
        <input
          type="text"
          placeholder="Filtra post per titolo..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-2 italic">
          Trovati {filteredPosts.length} post su {posts.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="col-span-full py-10 text-center text-gray-400">
            Nessun post corrisponde alla ricerca.
          </div>
        )}
      </div>
    </div>
  )
}
