import type { Metadata } from 'next'
import { getPublishedTrainers } from '@/lib/data/trainers'
import { Plus, Award, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Manage Trainers & Faculty Showcase',
}

export default async function AdminTrainersPage() {
  const trainers = await getPublishedTrainers()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Faculty & Trainers Showcase</h1>
          <p className="text-sm text-gray-500">Manage public instructor profiles, qualifications, and specializations.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add New Trainer Profile
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {trainers.map((t) => (
          <div key={t.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                {t.languages}
              </span>
              <div className="flex items-center gap-2">
                <button type="button" className="text-xs text-gray-500 hover:text-indigo-600 font-medium">Edit</button>
                <button type="button" className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-base">{t.name}</h3>
            <p className="text-xs font-medium text-gray-500">{t.role} · {t.qualifications}</p>
            <p className="text-xs text-gray-600 line-clamp-3">{t.bio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
