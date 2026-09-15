import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'
import { getPublishedCourses } from '@/lib/data/courses'
import { BookOpen, Clock, Users, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Course Catalog & CEFR Programs',
  description: 'Explore French and German language curriculums aligned with CEFR standards A1, A2, B1, B2, C1, C2.',
}

export default async function CoursesCatalogPage() {
  const courses = await getPublishedCourses()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />

      {/* Header Banner */}
      <section className="bg-gray-50 border-b border-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" /> CEFR Aligned Programs
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fluenciel Course Catalog
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Comprehensive language diplomas featuring live oral laboratories, small cohort sizes, and diagnostic mock examinations.
          </p>
        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="py-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Level {course.level}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{course.mode}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3">{course.short_description}</p>

                  <div className="space-y-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>Max {course.batch_size} students per cohort</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>{course.mock_tests} Diagnostic Mock Tests</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Total Fee</span>
                    <div className="text-xl font-extrabold text-gray-900">
                      ₹{course.fee.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}

            {courses.length === 0 && (
              <div className="col-span-full py-20 text-center text-sm text-gray-500">
                No published courses available at the moment. Please check back soon or contact our admissions office.
              </div>
            )}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
