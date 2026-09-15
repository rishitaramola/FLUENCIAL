import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getStudentsByTeacher } from '@/lib/data/students'
import { Award, PenTool, Headphones, MessageSquare, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CEFR Skill Diagnostics & Evaluation',
}

export default async function TeacherProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const students = user ? await getStudentsByTeacher(user.id) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">CEFR Student Skill Evaluator</h1>
        <p className="text-sm text-gray-500">Log score diagnostics across the 4 core communicative domains and mock exams.</p>
      </div>

      <div className="space-y-4">
        {students.map((s) => (
          <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                  {s.profile?.full_name ? s.profile.full_name.charAt(0) : 'S'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{s.profile?.full_name || 'Enrolled Student'}</h3>
                  <span className="text-xs text-indigo-600 font-medium">Status: {s.status}</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                Update Evaluation
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs">
              <div className="rounded-lg bg-gray-50 p-3 space-y-1">
                <span className="text-gray-500 font-medium">Spoken Fluency</span>
                <div className="text-base font-bold text-gray-900">85 / 100</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 space-y-1">
                <span className="text-gray-500 font-medium">Listening Comp.</span>
                <div className="text-base font-bold text-gray-900">78 / 100</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 space-y-1">
                <span className="text-gray-500 font-medium">Reading Analysis</span>
                <div className="text-base font-bold text-gray-900">90 / 100</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 space-y-1">
                <span className="text-gray-500 font-medium">Written Expression</span>
                <div className="text-base font-bold text-gray-900">72 / 100</div>
              </div>
            </div>
          </div>
        ))}
        {students.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
            No assigned students to evaluate.
          </div>
        )}
      </div>
    </div>
  )
}
