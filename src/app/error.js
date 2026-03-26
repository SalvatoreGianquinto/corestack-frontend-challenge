"use client"

export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 max-w-md">
        <h2 className="text-xl font-bold text-slate-800">
          Ops! Qualcosa è andato storto
        </h2>
        <p className="text-slate-500 mt-2 mb-6">
          {"Non siamo riusciti a caricare i post."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Riprova
        </button>
      </div>
    </div>
  )
}
