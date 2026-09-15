import type { Metadata } from 'next'
import { getAllStudents } from '@/lib/data/students'
import { GraduationCap, UserCheck, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Student Directory',
}

export default async function AdminStudentsPage() {
  const students = await getAllStudents()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Student Directory</h1>
          <p className="text-sm text-gray-500">View enrolled students, mentor assignments, and status tracking.</p>
        </div>
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
                  Assigned Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Enrolled Since
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                        {student.profile?.full_name ? student.profile.full_name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {student.profile?.full_name || 'Unnamed Student'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.profile?.phone || 'No phone provided'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.teacher?.profile?.full_name ? (
                      <div className="flex items-center gap-1.5 font-medium text-gray-900">
                        <UserCheck className="h-4 w-4 text-emerald-600" />
                        <span>{student.teacher.profile.full_name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.status === 'ACTIVE' || student.status === 'ENROLLED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.status === 'COMPLETED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      <span>{new Date(student.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                    No students registered yet.
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
