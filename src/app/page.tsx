import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'
import { EuropeMapBg } from '@/components/europe-map-bg'
import { FAQSection } from '@/components/faq-section'
import { SuccessStoriesSection } from '@/components/success-stories-section'
import { getPublishedCourses } from '@/lib/data/courses'
import { getAllFaqs } from '@/lib/data/faqs'
import { getSuccessStories } from '@/lib/data/testimonials'
import { submitLeadAction } from '@/app/actions/leads'
import {
  Globe,
  BookOpen,
  Award,
  Users,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  Video
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fluenciel Language Studio | Master French & German Fluency',
  description: 'Premiere CEFR-aligned French and German language training with native instructors, small batch sizes, and DELF/GOETHE certification guarantee.',
}

export default async function HomePage() {
  const [courses, faqs, stories] = await Promise.all([
    getPublishedCourses(),
    getAllFaqs(),
    getSuccessStories(),
  ])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />

      {/* Hero Section with European Map Vector Background Overlay */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white py-20 lg:py-28">
        <EuropeMapBg />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Hero Left Content */}
            <div className="space-y-6 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-xs backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>Admissions Open for New CEFR Cohorts</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                Unlock Real Global <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Linguistic Fluency</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Master French & German with immersive live practice, native faculty guidance, and guaranteed DELF / GOETHE exam diagnostic support.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-all hover:scale-[1.02]"
                >
                  Explore All Courses <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#lead-form"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
                >
                  Book Free Demo Class
                </a>
              </div>

              {/* Trust badging */}
              <div className="pt-6 flex items-center justify-center sm:justify-start gap-6 text-xs text-gray-500 border-t border-gray-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> CEFR Aligned
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-indigo-600" /> Max 10 Students/Batch
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500" /> 4.9/5 Rating
                </span>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-2xl space-y-6 relative z-10 backdrop-blur-xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Featured Cohort</span>
                    <h3 className="text-lg font-bold text-gray-900">French B1 Immersion Program</h3>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Live Batch
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>60 Hours Live Speaking & Pronunciation Lab</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>DELF B1 Full Exam Diagnostic Suite (5 Mocks)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>Official Course Material & Audio Workbook Included</span>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">Program Tuition</span>
                    <div className="text-xl font-extrabold text-gray-900">₹14,999 INR</div>
                  </div>
                  <Link
                    href="/courses"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Curriculums</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">Featured Language Programs</h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              View Full Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {course.level} Level
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{course.mode}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{course.short_description}</p>

                  <div className="space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>Max {course.batch_size} students</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Total Fee</span>
                    <div className="text-lg font-bold text-gray-900">₹{course.fee.toLocaleString('en-IN')}</div>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories & Video Testimonials */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Student Reviews</span>
            <h2 className="text-3xl font-bold text-gray-900">Success Stories & DELF/GOETHE Achievers</h2>
            <p className="text-sm text-gray-600">Hear directly from our students who cleared their CEFR exams and secured university admissions & visa clearances.</p>
          </div>

          <SuccessStoriesSection stories={stories} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Got Questions?</span>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600">Everything you need to know about our courses, certifications, batch timings, and online payment options.</p>
          </div>

          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* Book a Demo Lead Intake Form */}
      <section id="lead-form" className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Book a Free 1-on-1 Academic Consultation</h2>
            <p className="text-sm text-indigo-200">
              Speak with a senior language instructor to evaluate your target level and select the right cohort.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 text-gray-900 shadow-2xl">
            <form action={submitLeadAction} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                  Course of Interest
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">General Language Inquiry</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.level})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Goals & Preferred Schedule
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Tell us about your learning timeline, visa goals, or prior background..."
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
                >
                  Request Consultation & Call Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
