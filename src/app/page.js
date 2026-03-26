import PostList from "@/components/PostList"
import api from "./lib/axios"

export default async function Home() {
  const { data: posts } = await api.get("/posts")

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Feed Contenuti
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Challenge Tecnica</p>
        </header>
        <PostList initialPosts={posts} />
      </div>
    </main>
  )
}
