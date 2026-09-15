import type { Metadata } from 'next'
import { getAllEnrollments } from '@/lib/data/enrollments'
import { GraduationCap, BookOpen, Calendar, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Master Enrollments',
}

export default async function AdminEnrollmentsPage() {
  const enrollments = await getAllEnrollments()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Master Enrollments Ledger</h1>
        <p className="text-sm text-gray-500">Track student course assignments, tuition balances, and active cohort statuses.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Course & Cohort
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tuition Paid / Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Enrollment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {enrollments.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">
                      {e.student?.profile?.full_name || 'Enrolled Student'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    <div className="font-semibold text-gray-900">{e.course?.title}</div>
                    <div className="text-gray-400">{e.batch?.batch_name || 'General Cohort'}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-gray-900">
                    ₹{e.amount_paid.toLocaleString('en-IN')}{' '}
                    {e.balance > 0 && <span className="text-amber-600 font-normal">(Due: ₹{e.balance.toLocaleString('en-IN')})</span>}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {e.enrollment_date ? new Date(e.enrollment_date).toLocaleDateString() : 'Active'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No active student enrollments logged yet.
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
