import { feeLabel } from '@/lib/format'
import type { Course } from '@/lib/data/courses'
import Link from 'next/link'

const ACCENTS = [
  { badge: 'Beginner', tone: 'from-[#fff7ed] to-white', glyph: 'A1' },
  { badge: 'Progression', tone: 'from-[#eef2ff] to-white', glyph: 'A2' },
  { badge: 'Independent', tone: 'from-[#fdf2f8] to-white', glyph: 'B1' },
]

export function CourseCards({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-navy/15 bg-white/70 px-6 py-14 text-center">
        <p className="font-semibold text-navy">Courses will appear here when they are published.</p>
        <p className="mt-2 text-sm text-navy/60">
          Until then, you can still enquire about French learning and book a free demo.
        </p>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white">
          Book a Free Demo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {courses.map((course, index) => {
        const accent = ACCENTS[index % ACCENTS.length]
        return (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className={`group flex flex-col rounded-[1.8rem] border border-white bg-gradient-to-b ${accent.tone} p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-navy shadow-sm">
                {course.level.replace(/[^A-Z0-9]/gi, '').slice(0, 2) || accent.glyph}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/40">
                {course.level}
              </span>
            </div>
            <h3 className="mt-8 text-xl font-semibold tracking-tight text-navy">{course.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/60">{course.short_description}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-navy/55">
              <span>{course.mode}</span>
              <span className="font-medium text-navy">{feeLabel(course.fee)}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
