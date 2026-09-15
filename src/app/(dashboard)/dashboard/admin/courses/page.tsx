import type { Metadata } from 'next'
import { getAllCourses } from '@/lib/data/courses'
import { Plus, BookOpen, Clock, Users, IndianRupee } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Courses Directory',
}

export default async function AdminCoursesPage() {
  const courses = await getAllCourses()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Course Management</h1>
          <p className="text-sm text-gray-500">Create, edit, and publish language training programs.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Course
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Course / Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Mode & Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Batch & Tests
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Fee (INR)
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{course.title}</div>
                        <div className="text-xs text-gray-500">Slug: /{course.slug} · Level: {course.level}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{course.mode} mode</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-gray-400" />
                      <span>Max {course.batch_size} students</span>
                    </div>
                    <div className="text-xs text-gray-400">{course.mock_tests} mock tests included</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    <div>₹{course.fee.toLocaleString('en-IN')}</div>
                    {course.registration_fee > 0 && (
                      <div className="text-xs text-gray-400 font-normal">
                        + ₹{course.registration_fee.toLocaleString('en-IN')} reg.
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        course.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : course.status === 'draft'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No courses found. Click &quot;New Course&quot; to create your first curriculum.
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
