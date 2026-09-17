import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { PublicShell } from '@/components/public-shell'
import { getCourseBySlug } from '@/lib/data/courses'
import { CheckoutButton } from './checkout-button'
import { BackButton } from '@/components/back-button'
import { CheckCircle2, Clock, Users, BookOpen } from 'lucide-react'
import { feeLabel } from '@/lib/format'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course || course.status !== 'published') return { title: 'Course Not Found' }
  return {
    title: `${course.title} | Fluenciel Language Studio`,
    description: course.short_description,
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  // Enforce public visibility rule
  if (!course || course.status !== 'published') {
    notFound()
  }

  let syllabusList: Array<{ title: string; topics: string[] }> = []
  if (Array.isArray(course.syllabus)) {
    syllabusList = course.syllabus as Array<{ title: string; topics: string[] }>
  }

  return (
    <PublicShell>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Header Banner - Light Premium Variant */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="mb-8">
            <BackButton fallbackUrl="/courses" label="Back to Catalog" />
          </div>
          
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-studio/10 px-3 py-1 text-[11px] font-bold tracking-wider text-studio shadow-sm">
                LEVEL {course.level}
              </span>
              <span className="inline-flex rounded-full border border-navy/10 bg-white/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy/60 backdrop-blur-sm">
                {course.mode}
              </span>
            </div>
            
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              {course.title}
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl">
              {course.description}
            </p>
          </div>
        </div>
      </section>

      {/* Course Main Details & Enrollment Card */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              
              {/* Program Features */}
              <div className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md sm:p-10">
                <h2 className="font-heading text-2xl font-bold text-navy">What's Included</h2>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-studio/10 text-studio">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-navy">Course Materials</h4>
                      <p className="mt-1 text-sm text-navy/60">
                        {course.material_included ? 'Digital workbooks included' : 'Materials provided separately'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-navy">{course.mock_tests} Mock Exams</h4>
                      <p className="mt-1 text-sm text-navy/60">Evaluated diagnostics</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-navy">Small Cohorts</h4>
                      <p className="mt-1 text-sm text-navy/60">Capped at {course.batch_size} students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-navy">Duration</h4>
                      <p className="mt-1 text-sm text-navy/60">{course.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Syllabus Outline */}
              {syllabusList.length > 0 && (
                <div className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md sm:p-10">
                  <h2 className="font-heading text-2xl font-bold text-navy">Curriculum</h2>
                  <div className="mt-8 space-y-6">
                    {syllabusList.map((module, idx) => (
                      <div key={idx} className="relative pl-8">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-studio bg-white" />
                        {/* Timeline line */}
                        {idx !== syllabusList.length - 1 && (
                          <div className="absolute left-[5px] top-4 bottom-[-24px] w-0.5 bg-studio/20" />
                        )}
                        <h4 className="text-[15px] font-semibold text-navy">{module.title || `Module ${idx + 1}`}</h4>
                        {Array.isArray(module.topics) && (
                          <ul className="mt-3 space-y-2">
                            {module.topics.map((t, tIdx) => (
                              <li key={tIdx} className="text-sm text-navy/65 flex items-start">
                                <span className="mr-2 text-navy/30">•</span> {t}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Enrollment Card */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 overflow-hidden rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-xl shadow-navy/5 backdrop-blur-xl">
                <div className="mb-8 pb-8 border-b border-navy/5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-navy/40">Total Course Fee</span>
                  <div className="mt-2 text-4xl font-extrabold text-navy">
                    {feeLabel(course.fee)}{' '}
                  </div>
                  {course.registration_fee > 0 && (
                    <p className="mt-3 text-[13px] font-medium text-navy/50">
                      + {feeLabel(course.registration_fee)} registration fee
                    </p>
                  )}
                </div>

                <div className="mb-8 space-y-4">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-navy/50">Learning Mode</span>
                    <span className="font-semibold capitalize text-navy">{course.mode}</span>
                  </div>
                  {course.start_date && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-medium text-navy/50">Cohort Starts</span>
                      <span className="font-semibold text-navy">
                        {new Date(course.start_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {course.installment_available && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-medium text-navy/50">Installments</span>
                      <span className="font-semibold text-emerald-600">Available</span>
                    </div>
                  )}
                </div>

                <CheckoutButton
                  courseId={course.id}
                  courseTitle={course.title}
                  fee={course.fee}
                />

                <p className="mt-6 text-center text-[11px] font-medium text-navy/40">
                  Secure checkout via Razorpay
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
