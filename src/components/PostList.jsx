"use client"

import { useState, useMemo } from "react"
import PostCard from "./PostCard"
import PostForm from "./PostForm"

export default function PostList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts)
  const [query, setQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()),
    )
  }, [posts, query])

  const currentPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount)
  }, [filteredPosts, visibleCount])

  const addPost = (newPostData) => {
    const maxId =
      posts.length > 0 ? Math.max(...posts.map((p) => Number(p.id))) : 0

    const finalPost = { ...newPostData, id: maxId + 1 }

    setPosts([finalPost, ...posts])
    setShowForm(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const deletePost = (id) => {
    if (window.confirm("Vuoi davvero eliminare questo post?")) {
      setPosts((prev) => prev.filter((post) => post.id !== id))
    }
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8)
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative grow max-w-md">
          <input
            type="text"
            placeholder="Cerca tra i post..."
            className="w-full px-5 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm bg-white"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisibleCount(8)
            }}
          />
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-md ${
            showForm
              ? "bg-slate-200 text-slate-700"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {currentPosts.map((post) => (
          <div key={post.id} className="relative group">
            <PostCard post={post} />
            <button
              onClick={() => deletePost(post.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
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

      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center pt-8">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-md active:scale-95"
          >
            Carica altri post
          </button>
        </div>
      )}
    </div>
  )
}
