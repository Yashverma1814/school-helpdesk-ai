// Landing page placeholder displaying project status and quick navigation.
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl p-8 bg-white rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
          School Helpdesk AI
        </h1>
        <p className="text-slate-600 mb-6">
          Multi-tenant RAG SaaS: Answering parent questions directly from verified school circulars
          with citations.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/chat"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Parent Chat (Coming Soon)
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </main>
  );
}
