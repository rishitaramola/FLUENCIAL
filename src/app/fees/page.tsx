import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'
import { getPublishedCourses } from '@/lib/data/courses'
import { CheckCircle2, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Transparent Fee Structure & Tuition | Fluenciel Studio',
  description: 'View clear fee structures, registration costs, and installment plans for French and German language programs.',
}

export default async function FeesPage() {
  const courses = await getPublishedCourses()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />

      {/* Header Banner */}
      <section className="bg-gray-50 border-b border-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Transparent Pricing
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Course Tuition & Fee Structure
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            No hidden costs. All tuition fees include digital workbooks, live speaking labs, and full DELF/GOETHE mock diagnostic evaluations.
          </p>
        </div>
      </section>

      {/* Pricing Table Grid */}
      <section className="py-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-indigo-600 hover:shadow-md transition-all"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {course.level} Diploma
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{course.mode}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{course.duration} · Max {course.batch_size} students</p>
                  </div>

                  <div className="border-t border-b border-gray-100 py-4 space-y-1">
                    <div className="text-3xl font-extrabold text-gray-900">
                      ₹{course.fee.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-gray-500">INR</span>
                    </div>
                    {course.registration_fee > 0 && (
                      <p className="text-xs text-gray-500">
                        + ₹{course.registration_fee.toLocaleString('en-IN')} one-time reg fee
                      </p>
                    )}
                    {course.installment_available && (
                      <span className="inline-block mt-2 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Installment Payment Available
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{course.mock_tests} DELF/GOETHE Mock Tests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Digital Audio & Workbooks Included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Live Speaking & Accent Correction</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                  >
                    View Details & Enroll <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
