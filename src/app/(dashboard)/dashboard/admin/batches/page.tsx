import type { Metadata } from 'next'
import { getAllBatches } from '@/lib/data/batches'
import { Plus, Users, Calendar, Clock, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Batches & Live Cohorts',
}

export default async function AdminBatchesPage() {
  const batches = await getAllBatches()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Batches & Live Cohorts</h1>
          <p className="text-sm text-gray-500">Manage live class schedules, teacher assignments, and cohort capacities.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" /> Create New Batch
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Batch Name / Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Schedule & Timings
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Assigned Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Enrollment Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">{b.batch_name}</div>
                    <div className="text-xs text-gray-500">{b.course?.title || 'Language Program'}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1 font-medium text-gray-900">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span>{b.schedule_text}</span>
                    </div>
                    <div className="text-gray-400 mt-0.5">Starts: {new Date(b.start_date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900">
                    {b.teacher?.profile?.full_name || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    <span className="font-bold text-gray-900">{b.enrolled_count}</span> / {b.capacity} enrolled
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {batches.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No active batches configured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
