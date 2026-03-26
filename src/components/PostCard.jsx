export default function PostCard({ post }) {
  return (
    <div className="bg-white p-6 roundend-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="grow text-gray-800">
        <h3 className="text-lg font-bold capitalize mb-2 line-clmap-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm leanding-relaxed line-clamp-3">
          {post.body}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 font-mono">
        <span>USER_ID: {post.userId}</span>
        <span>ID: {post.id}</span>
      </div>
    </div>
  )
}
