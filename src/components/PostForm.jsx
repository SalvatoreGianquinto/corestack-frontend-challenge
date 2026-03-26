"use client"

import api from "@/app/lib/axios"
import { useState } from "react"

export default function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title.trim() || !body.trim()) {
      setError("Titolo e contenuto sono obbligatori")
      return
    }

    setIsLoading(true)

    try {
      const res = await api.post("/posts", {
        title,
        body,
        userId: 1,
      })

      const newPost = {
        ...res.data,
        id: Math.floor(Date.now() % 1000000),
      }

      onPostCreated(newPost)

      setTitle("")
      setBody("")
    } catch (err) {
      setError("C'è stato un problema con l'invio. Riprova più tardi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-12">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Aggiungi un nuovo contenuto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Titolo accattivante..."
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Scrivi qui il tuo messaggio..."
            rows="3"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium animate-pulse">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all shadow-lg ${
            isLoading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
          }`}
        >
          {isLoading ? "Pubblicazione in corso..." : "Pubblica Post"}
        </button>
      </form>
    </section>
  )
}
