import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getPublishedCourses } from '@/lib/data/courses'
import { getPaymentsByStudent } from '@/lib/data/payments'
import { BookOpen, Award, CheckCircle2, Clock, Video, ArrowRight, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Student Learning Space',
}

export default async function StudentDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [courses, payments] = await Promise.all([
    getPublishedCourses(),
    user ? getPaymentsByStudent(user.id) : [],
  ])

  // Get active course (either from payments or fallback to first featured course)
  const activeCourse = courses[0]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-8 text-white shadow-lg">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            Fluenciel Immersion Studio
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Bienvenue! Welcome back to your learning space.</h1>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Consistent practice is the cornerstone of linguistic fluency. Access your live sessions, syllabus materials, and mock diagnostics below.
          </p>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Live Speaking Hours</span>
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <MessageCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">18.5 hrs</span>
            <p className="mt-1 text-xs text-gray-500">Target: 30 hrs for B1 Certification</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Mock Exams Completed</span>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">3 / 5</span>
            <p className="mt-1 text-xs text-gray-500">Average score: 84%</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Next Live Class</span>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Video className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-lg font-bold text-gray-900">Tomorrow, 10:00 AM</span>
            <p className="mt-1 text-xs text-gray-500">Speaking & Pronunciation Lab</p>
          </div>
        </div>
      </div>

      {/* Current Program Card */}
      {activeCourse && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  {activeCourse.level} Level Program
                </span>
                <h3 className="text-lg font-bold text-gray-900">{activeCourse.title}</h3>
              </div>
            </div>
            <Link
              href="/dashboard/student/courses"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500"
            >
              View curriculum <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <p className="text-sm text-gray-600">{activeCourse.short_description}</p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1 font-medium text-gray-700">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              {activeCourse.duration}
            </span>
            <span>·</span>
            <span>Batch Size: {activeCourse.batch_size} students max</span>
            <span>·</span>
            <span>{activeCourse.mode} mode</span>
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Syllabus Completion</span>
              <span className="font-semibold text-gray-900">62%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '62%' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
