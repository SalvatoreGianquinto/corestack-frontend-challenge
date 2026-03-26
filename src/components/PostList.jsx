"use client"

import { useState } from "react"
import PostCard from "./PostCard"
import PostForm from "./PostForm"

export default function PostList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts)
  const [query, setQuery] = useState("")
  const [showForm, setShowForm] = useState(false)

  const addPost = (newPost) => {
    setPosts([newPost, ...posts])
    setShowForm(false)
  }

  const deletePost = (id) => {
    if (window.confirm("Vuoi davvero eliminare questo post?")) {
      setPosts(posts.filter((post) => post.id !== id))
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative grow max-w-md">
          <input
            type="text"
            placeholder="Cerca tra i post..."
            className="w-full px-5 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
            showForm
              ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
          }`}
        >
          {showForm ? "Annulla" : "＋ Nuovo Post"}
        </button>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <PostForm onPostCreated={addPost} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="relative group">
            <PostCard post={post} />

            <button
              onClick={() => deletePost(post.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 active:scale-90"
              title="Elimina post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          Nessun post trovato per questa ricerca.
        </div>
      )}
    </div>
  )
}
