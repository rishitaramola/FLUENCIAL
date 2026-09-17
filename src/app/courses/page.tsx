import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'
import { CourseCards } from '@/components/course-cards'
import { getPublishedCourses } from '@/lib/data/courses'

export const metadata: Metadata = {
  title: 'French courses',
  description: 'Browse published French courses at Fluenciel Language Studio. Levels, formats, and fees are shown only when they have been set.',
  alternates: { canonical: '/courses' },
}

export default async function CoursesCatalogPage() {
  const courses = await getPublishedCourses()

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-navy/60">
          French: available where published · Other languages: Coming Soon
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">Course catalogue</h1>
        <p className="mt-4 max-w-2xl text-base text-navy/65">
          Each programme is listed only when the academy has published it. Choose a course to see curriculum, format,
          and current fees — or enquire if details are still being confirmed.
        </p>
        <div className="mt-12">
          <CourseCards courses={courses} />
        </div>
      </div>
    </PublicShell>
  )
}
