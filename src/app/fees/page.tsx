import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { getPublishedCourses } from '@/lib/data/courses'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Transparent Fee Structure & Tuition | Fluenciel Studio',
  description: 'View clear fee structures, registration costs, and installment plans for our French language programs.',
}

export default async function FeesPage() {
  const courses = await getPublishedCourses()

  return (
    <PublicShell>
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/60 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-navy/70">
              Transparent Pricing
            </span>
          </div>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl mx-auto max-w-4xl">
            Course Tuition & Fee Structure
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl mx-auto max-w-2xl">
            No hidden costs. All tuition fees include digital workbooks, live speaking labs, and full mock diagnostic evaluations.
          </p>
        </div>
      </section>

      {/* Pricing Table Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 sm:p-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-studio/10 px-3 py-1 text-[11px] font-bold tracking-wider text-studio shadow-sm">
                      LEVEL {course.level}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-navy/40">
                      {course.mode}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl font-bold text-navy">{course.title}</h3>
                    <p className="mt-2 text-[13px] text-navy/60">{course.duration} · Max {course.batch_size} students</p>
                  </div>

                  <div className="border-y border-navy/5 py-6 space-y-2">
                    <div className="text-4xl font-extrabold text-navy">
                      ₹{course.fee.toLocaleString('en-IN')}{' '}
                      <span className="text-sm font-medium text-navy/40">INR</span>
                    </div>
                    {course.registration_fee > 0 && (
                      <p className="text-[13px] text-navy/50 font-medium">
                        + ₹{course.registration_fee.toLocaleString('en-IN')} registration fee
                      </p>
                    )}
                    {course.installment_available && (
                      <span className="inline-block mt-3 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                        Installments Available
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 text-[13px] text-navy/70">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="leading-tight">{course.mock_tests} Mock Exams Included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="leading-tight">Digital Audio & Workbooks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="leading-tight">Live Speaking Labs</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-4 py-3.5 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-navy/90 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-navy/20"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
