import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getStudentsByTeacher } from '@/lib/data/students'
import { Users, Calendar, Clock, ArrowRight, BookOpen, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Teacher Overview',
}

export default async function TeacherDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const students = user ? await getStudentsByTeacher(user.id) : []
  const activeStudents = students.filter((s) => s.status === 'ACTIVE' || s.status === 'ENROLLED')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Faculty Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your language cohorts, student progress, and daily speaking sessions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Assigned Students</span>
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">{students.length}</span>
            <p className="mt-1 text-xs text-gray-500">{activeStudents.length} active in current cohorts</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Today&apos;s Sessions</span>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">2 Batches</span>
            <p className="mt-1 text-xs text-gray-500">French B1 (4:00 PM) · German A1 (6:30 PM)</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Speaking Tests</span>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">3 Pending</span>
            <p className="mt-1 text-xs text-gray-500">Evaluation & feedback required</p>
          </div>
        </div>
      </div>

      {/* Assigned Students Overview */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">My Students</h2>
          <Link
            href="/dashboard/teacher/students"
            className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-500 gap-1"
          >
            View all roster <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {students.slice(0, 6).map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                  {student.profile?.full_name ? student.profile.full_name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.profile?.full_name || 'Enrolled Student'}</p>
                  <p className="text-xs text-gray-500">{student.profile?.phone || 'No phone'}</p>
                </div>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  student.status === 'ACTIVE' || student.status === 'ENROLLED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {student.status}
              </span>
            </div>
          ))}
          {students.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              No students assigned yet. Admins assign students to faculty when cohorts are scheduled.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
