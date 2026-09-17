import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { getPublishedCourses } from '@/lib/data/courses'
import { CEFR_LEVELS, normalizeLevel } from '@/lib/cefr'

export const metadata: Metadata = {
  title: 'French pathway',
  description: 'CEFR French levels from A1 to C2. Active levels reflect published Fluenciel courses; others are Coming Soon.',
  alternates: { canonical: '/french' },
}

export default async function FrenchPage() {
  const courses = await getPublishedCourses()
  const active = new Set(courses.map((c) => normalizeLevel(c.level)).filter(Boolean))

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy/40">French</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">A clear CEFR pathway</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/65">
          These level descriptions follow the Common European Framework. Fluenciel lists a level as available only when
          a matching course is published. Completing a course is not an official certificate.
        </p>
        <div className="mt-12 space-y-5">
          {CEFR_LEVELS.map((level) => {
            const offered = active.has(level.code)
            const related = courses.filter((c) => normalizeLevel(c.level) === level.code)
            return (
              <article key={level.code} className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-navy">
                      {level.code} · {level.name}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-navy/65">{level.learnerProfile}</p>
                  </div>
                  <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy/50">
                    {offered ? 'Offered' : 'Coming Soon'}
                  </span>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Objectives</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-navy/65">
                      {level.objectives.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Skills</h3>
                    <ul className="mt-2 space-y-1 text-sm text-navy/65">
                      <li><strong>Speaking:</strong> {level.skills.speaking}</li>
                      <li><strong>Listening:</strong> {level.skills.listening}</li>
                      <li><strong>Reading:</strong> {level.skills.reading}</li>
                      <li><strong>Writing:</strong> {level.skills.writing}</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-5 text-sm text-navy/55">{level.progression}</p>
                {level.next && (
                  <p className="mt-2 text-sm text-navy/55">Recommended next step: {level.next}</p>
                )}
                {related.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {related.map((c) => (
                      <Link key={c.id} href={`/courses/${c.slug}`} className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white">
                        {c.title}
                      </Link>
                    ))}
                  </div>
                )}
                <Link href={`/french/${level.code.toLowerCase()}`} className="mt-4 inline-block text-sm font-semibold text-indigo-600">
                  View {level.code} details →
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </PublicShell>
  )
}
