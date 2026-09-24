import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'
import { CourseCards } from '@/components/course-cards'
import { getPublishedCourses } from '@/lib/data/courses'

export const metadata: Metadata = {
  title: 'Our French Courses | Fluenciel',
  description: 'Whether you’re planning to study, work or settle abroad, Fluenciel offers structured and goal-oriented French courses designed around your needs.',
  alternates: { canonical: '/courses' },
}

export default async function CoursesCatalogPage() {
  const courses = await getPublishedCourses()

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28 relative">
        {/* Top area branding */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-heading text-sm font-bold tracking-widest text-navy/40 uppercase mb-4">
            COURSES
          </h1>
          
          <h2 className="font-heading text-4xl tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Choose the pathway that matches your goal.
          </h2>
        </div>

        <div className="relative z-10">
          <CourseCards courses={courses} />
        </div>
      </div>
    </PublicShell>
  )
}
