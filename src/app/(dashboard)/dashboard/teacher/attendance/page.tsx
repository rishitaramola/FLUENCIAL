import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getStudentsByTeacher } from '@/lib/data/students'
import { Calendar, CheckCircle2, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Log Batch Attendance',
}

export default async function TeacherAttendancePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const students = user ? await getStudentsByTeacher(user.id) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Live Class Attendance Logger</h1>
        <p className="text-sm text-gray-500">Record daily student attendance for your active live cohorts.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <span>Today&apos;s Class Session ({new Date().toLocaleDateString()})</span>
          </div>
          <button
            type="button"
            className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Save All Attendance
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                  {student.profile?.full_name ? student.profile.full_name.charAt(0) : 'S'}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {student.profile?.full_name || 'Enrolled Student'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 cursor-pointer">
                  <input type="radio" name={`att_${student.id}`} value="PRESENT" defaultChecked className="accent-emerald-600" />
                  Present
                </label>
                <label className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 cursor-pointer">
                  <input type="radio" name={`att_${student.id}`} value="ABSENT" className="accent-red-600" />
                  Absent
                </label>
                <label className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 cursor-pointer">
                  <input type="radio" name={`att_${student.id}`} value="LATE" className="accent-amber-600" />
                  Late
                </label>
              </div>
            </div>
          ))}
          {students.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No assigned students to log attendance for.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
