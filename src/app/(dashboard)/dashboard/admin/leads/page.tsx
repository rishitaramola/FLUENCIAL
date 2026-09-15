import type { Metadata } from 'next'
import { getAllLeads } from '@/lib/data/leads'
import { changeLeadStatus } from './actions'
import { Mail, Phone, BookOpen, Clock, Calendar } from 'lucide-react'
import type { LeadStatus } from '@/lib/supabase/types'

export const metadata: Metadata = {
  title: 'Leads & Admissions Pipeline',
}

const STATUS_OPTIONS: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'FOLLOW_UP',
  'INTERESTED',
  'REGISTERED',
  'CONVERTED',
  'CLOSED',
]

export default async function AdminLeadsPage() {
  const leads = await getAllLeads()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Leads & Admissions Pipeline</h1>
        <p className="text-sm text-gray-500">Track inquiries, contact interested candidates, and manage conversions.</p>
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
                  Course Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Notes / Inquiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Received
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">{lead.name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span>{lead.email}</span>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.course ? (
                      <div className="flex items-center gap-1.5 font-medium text-indigo-700">
                        <BookOpen className="h-4 w-4 text-indigo-500" />
                        <span>{lead.course.title}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">General Inquiry</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
                    {lead.notes || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <form action={changeLeadStatus} className="flex items-center gap-2">
                      <input type="hidden" name="leadId" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No leads in pipeline. Inquiries from the website contact forms will appear here.
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
