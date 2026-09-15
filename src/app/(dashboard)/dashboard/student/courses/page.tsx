import type { Metadata } from 'next'
import { getPublishedCourses } from '@/lib/data/courses'
import { BookOpen, CheckCircle2, FileText, Download, Clock, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Enrolled Courses',
}

export default async function StudentCoursesPage() {
  const courses = await getPublishedCourses()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Language Curriculums</h1>
        <p className="text-sm text-gray-500">Access your syllabus, lesson handouts, and interactive grammar guides.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  {course.level} Level
                </span>
                <span className="text-xs text-gray-500 capitalize">{course.mode}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{course.short_description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {course.mock_tests} Mock Exams
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
              {course.brochure_url ? (
                <a
                  href={course.brochure_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-indigo-600"
                >
                  <Download className="h-3.5 w-3.5" /> Brochure PDF
                </a>
              ) : (
                <span className="text-xs text-gray-400">Digital materials included</span>
              )}
              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                Access Courseware
              </button>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-gray-500">
            No active courses available right now. Check back soon!
          </div>
        )}
      </div>
    </div>
  )
}
