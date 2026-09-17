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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/60 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-studio animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-navy/70">
              Choose your path • Learn French • Achieve your goals
            </span>
          </div>
          
          <h1 className="font-heading text-4xl tracking-tight text-navy sm:text-6xl lg:text-[64px] lg:leading-[1.1]">
            Our French<br />Language Courses
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl">
            Whether you’re planning to study, work or settle abroad, Fluenciel offers structured and goal-oriented French courses designed around your needs.
          </p>
        </div>

        <div className="relative z-10">
          <CourseCards courses={courses} />
        </div>
      </div>
    </PublicShell>
  )
}
