import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'
import { getCourseBySlug } from '@/lib/data/courses'
import { CheckoutButton } from './checkout-button'
import {
  CheckCircle2,
  ArrowLeft
} from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) return { title: 'Course Not Found' }
  return {
    title: `${course.title} (${course.level}) | Fluenciel Studio`,
    description: course.short_description,
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  let syllabusList: Array<{ title: string; topics: string[] }> = []
  if (Array.isArray(course.syllabus)) {
    syllabusList = course.syllabus as Array<{ title: string; topics: string[] }>
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <PublicNav />

      {/* Header Banner */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-xs font-semibold text-indigo-300">
              Level {course.level}
            </span>
            <span className="text-xs text-gray-400 capitalize">{course.mode} Learning</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {course.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            {course.description}
          </p>
        </div>
      </section>

      {/* Course Main Details & Enrollment Card */}
      <section className="py-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left Content (Syllabus & Features) */}
            <div className="lg:col-span-2 space-y-10">
              {/* Program Features */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-gray-900">What&apos;s Included in this Program</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Live Speaking Labs</h4>
                      <p className="text-xs text-gray-500">Interactive oral practice sessions twice a week.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{course.mock_tests} Mock Exams</h4>
                      <p className="text-xs text-gray-500">Full exam diagnostics evaluated by certified trainers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Course Materials</h4>
                      <p className="text-xs text-gray-500">
                        {course.material_included ? 'Digital workbooks & audio included' : 'Separate materials'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Small Cohorts</h4>
                      <p className="text-xs text-gray-500">Capped at {course.batch_size} students max.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Syllabus Outline */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Curriculum & Syllabus Breakdown</h2>
                {syllabusList.length > 0 ? (
                  <div className="space-y-4">
                    {syllabusList.map((module, idx) => (
                      <div key={idx} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{module.title || `Module ${idx + 1}`}</h4>
                        {Array.isArray(module.topics) && (
                          <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                            {module.topics.map((t, tIdx) => (
                              <li key={tIdx}>{t}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 leading-relaxed space-y-2">
                    <p>� Phonetics, pronunciation mechanics, and basic syntax.</p>
                    <p>� Conversational dialogues: greetings, travel, professional scenarios.</p>
                    <p>� Grammar modules: tenses, subjunctive moods, prepositions, articles.</p>
                    <p>� Listening comprehension exercises and dictation tests.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar Enrollment Card */}
            <div className="space-y-6">
              <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl space-y-6">
                <div className="space-y-2 border-b border-gray-100 pb-4">
                  <span className="text-xs text-gray-400">Total Course Fee</span>
                  <div className="text-3xl font-extrabold text-gray-900">
                    ?{course.fee.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-medium text-gray-500">INR</span>
                  </div>
                  {course.registration_fee > 0 && (
                    <p className="text-xs text-gray-500">
                      + ?{course.registration_fee.toLocaleString('en-IN')} one-time registration fee
                    </p>
                  )}
                </div>

                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span>Duration:</span>
                    <span className="font-semibold text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span>Learning Mode:</span>
                    <span className="font-semibold text-gray-900 capitalize">{course.mode}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span>Batch Capacity:</span>
                    <span className="font-semibold text-gray-900">{course.batch_size} students</span>
                  </div>
                  {course.start_date && (
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span>Cohort Starts:</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(course.start_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Instant Checkout Trigger */}
                <CheckoutButton
                  courseId={course.id}
                  courseTitle={course.title}
                  fee={course.fee}
                />

                <p className="text-[11px] text-center text-gray-400">
                  Instant secure payment via Razorpay. Tax invoice provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
