import type { Metadata } from 'next'
import { getAllDemoBookings } from '@/lib/data/demo-bookings'
import { Calendar, Clock, Mail, Phone, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Demo Class Requests CRM',
}

export default async function AdminDemoRequestsPage() {
  const requests = await getAllDemoBookings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Demo Class Requests & Consultation Pipeline</h1>
        <p className="text-sm text-gray-500">Inbound demo booking requests submitted by prospective students.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Target Level & Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Preferred Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">{r.full_name}</div>
                    <div className="text-xs text-gray-500">{r.email} {r.phone ? `· ${r.phone}` : ''}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600">
                    <div className="font-semibold text-indigo-700">{r.current_level}</div>
                    <div className="text-gray-400">{r.purpose || 'General Inquiry'}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {r.preferred_date ? new Date(r.preferred_date).toLocaleDateString() : 'Flexible'}{' '}
                    {r.preferred_time ? `(${r.preferred_time})` : ''}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                      {r.status || 'PENDING'}
                    </span>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                    No demo requests logged yet. Submissions from the website demo booking form will appear here.
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
