import type { Metadata } from 'next'
import { getAllTeachers } from '@/lib/data/teachers'
import { getAllStudents } from '@/lib/data/students'
import { UserCheck, Users, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Faculty & Teachers',
}

export default async function AdminTeachersPage() {
  const [teachers, students] = await Promise.all([
    getAllTeachers(),
    getAllStudents(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Faculty & Instructors</h1>
          <p className="text-sm text-gray-500">Language trainers, assigned cohorts, and teaching profiles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => {
          const assignedCount = students.filter((s) => s.teacher_id === teacher.id).length
          return (
            <div
              key={teacher.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold text-lg">
                    {teacher.profile?.full_name ? teacher.profile.full_name.charAt(0).toUpperCase() : 'T'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{teacher.profile?.full_name || 'Instructor'}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span>{teacher.profile?.phone || 'No phone'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-600 line-clamp-3">
                  {teacher.bio || 'Experienced certified language mentor focusing on communicative fluency and exam preparation.'}
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-indigo-600" />
                  <strong>{assignedCount}</strong> assigned students
                </span>
                <span className="rounded bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                  Active Faculty
                </span>
              </div>
            </div>
          )
        })}

        {teachers.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-gray-500">
            No instructors listed yet. When users with the TEACHER role are registered, they will appear here.
          </div>
        )}
      </div>
    </div>
  )
}
