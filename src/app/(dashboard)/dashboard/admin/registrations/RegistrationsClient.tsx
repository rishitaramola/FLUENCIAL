'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, ChevronLeft, ChevronRight, Eye, X, Mail, Phone, BookOpen, Clock, Calendar } from 'lucide-react'
import type { RegistrationWithCourse } from '@/lib/data/registrations'
import type { Tables, LeadStatus } from '@/lib/supabase/types'
import { changeRegistrationStatus } from './actions'

const STATUS_OPTIONS: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'FOLLOW_UP',
  'INTERESTED',
  'REGISTERED',
  'CONVERTED',
  'CLOSED',
]

const LEVEL_OPTIONS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Not Sure']

export function RegistrationsClient({
  registrations,
  totalCount,
  courses,
}: {
  registrations: RegistrationWithCourse[]
  totalCount: number
  courses: Tables<'courses'>[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '')
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get('course_id') || '')
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = 20

  const [selectedReg, setSelectedReg] = useState<RegistrationWithCourse | null>(null)

  const updateFilters = (newParams: Record<string, string | undefined>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) current.set(key, value)
      else current.delete(key)
    })
    // Reset page on filter change if not specifically updating page
    if (!newParams.page) current.set('page', '1')
    router.push(`?${current.toString()}`)
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') || '')) {
        updateFilters({ search })
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await changeRegistrationStatus(id, newStatus)
    // Update local state temporarily for snappy UI (or rely on server action revalidation)
  }

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => updateFilters({ status: e.target.value })}
            className="text-sm border border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => updateFilters({ course_id: e.target.value })}
            className="text-sm border border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Courses</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => updateFilters({ level: e.target.value })}
            className="text-sm border border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Levels</option>
            {LEVEL_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              updateFilters({ sort: e.target.value })
            }}
            className="text-sm border border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Registrant</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Program / Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 text-sm">{reg.name}</div>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Mail className="h-3 w-3" /> <span>{reg.email}</span>
                        </div>
                        {reg.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Phone className="h-3 w-3" /> <span>{reg.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{reg.course?.title || 'General / No Course'}</div>
                      <div className="text-xs text-gray-500 mt-1">Level: {reg.current_level || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={reg.status}
                        onChange={(e) => handleStatusChange(reg.id, e.target.value as LeadStatus)}
                        className="text-xs font-medium border border-gray-300 rounded-md py-1 pl-2 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(reg.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedReg(reg)}
                        className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" /> Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
              <span className="font-medium">{Math.min(page * limit, totalCount)}</span> of{' '}
              <span className="font-medium">{totalCount}</span> results
            </div>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => updateFilters({ page: String(page - 1) })}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => updateFilters({ page: String(page + 1) })}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">Registration Details</h2>
              <button 
                onClick={() => setSelectedReg(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              {/* Personal Details */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 border-b border-gray-100 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Full Name</div>
                    <div className="font-medium text-gray-900">{selectedReg.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Email Address</div>
                    <div className="font-medium text-gray-900">{selectedReg.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Phone Number</div>
                    <div className="font-medium text-gray-900">{selectedReg.phone || '—'}</div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 border-b border-gray-100 pb-2">Course Preferences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Selected Program</div>
                    <div className="font-medium text-indigo-700 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      {selectedReg.course?.title || 'None selected'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Current French Level</div>
                    <div className="font-medium text-gray-900">{selectedReg.current_level || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Preferred Timing</div>
                    <div className="font-medium text-gray-900 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {selectedReg.preferred_timing || '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Preferred Mode</div>
                    <div className="font-medium text-gray-900">{selectedReg.preferred_mode || '—'}</div>
                  </div>
                </div>
              </div>

              {/* Registration Meta */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 border-b border-gray-100 pb-2">Registration Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Submitted On</div>
                    <div className="font-medium text-gray-900 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(selectedReg.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Current Status</div>
                    <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                      {selectedReg.status}
                    </span>
                  </div>
                  {selectedReg.goal && (
                    <div className="sm:col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Goal / Reason for learning</div>
                      <div className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedReg.goal}</div>
                    </div>
                  )}
                  {selectedReg.notes && (
                    <div className="sm:col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Message / Notes</div>
                      <div className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100 whitespace-pre-wrap">{selectedReg.notes}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
