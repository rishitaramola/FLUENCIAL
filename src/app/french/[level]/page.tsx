import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { getPublishedCourses } from '@/lib/data/courses'
import { CEFR_LEVELS, normalizeLevel, type CefrCode } from '@/lib/cefr'

interface Props {
  params: Promise<{ level: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params
  const code = level.toUpperCase() as CefrCode
  const item = CEFR_LEVELS.find((l) => l.code === code)
  if (!item) return { title: 'French level' }
  return {
    title: `French ${item.code}`,
    description: item.learnerProfile,
    alternates: { canonical: `/french/${item.code.toLowerCase()}` },
  }
}

export default async function FrenchLevelPage({ params }: Props) {
  const { level } = await params
  const item = CEFR_LEVELS.find((l) => l.code === level.toUpperCase())
  if (!item) notFound()

  const courses = (await getPublishedCourses()).filter((c) => normalizeLevel(c.level) === item.code)

  return (
    <PublicShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link href="/french" className="text-sm font-medium text-navy/50 hover:text-navy">
          ← All French levels
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy/40">CEFR</p>
        <h1 className="mt-2 text-4xl font-semibold text-navy">
          {item.code} · {item.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-navy/65">{item.learnerProfile}</p>
        <p className="mt-4 text-sm font-semibold text-navy/50">
          {courses.length ? 'Currently offered at Fluenciel' : 'Coming Soon at Fluenciel'}
        </p>
        <section className="mt-10 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-navy">Objectives</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-navy/65">
              {item.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-navy">Skills</h2>
            <ul className="mt-2 space-y-1 text-sm text-navy/65">
              <li>Speaking — {item.skills.speaking}</li>
              <li>Listening — {item.skills.listening}</li>
              <li>Reading — {item.skills.reading}</li>
              <li>Writing — {item.skills.writing}</li>
            </ul>
          </div>
          <p className="text-sm text-navy/60">{item.progression}</p>
        </section>
        {courses.length > 0 ? (
          <div className="mt-10 space-y-3">
            <h2 className="text-lg font-semibold text-navy">Published courses</h2>
            {courses.map((c) => (
              <Link key={c.id} href={`/courses/${c.slug}`} className="block rounded-2xl bg-white p-4 text-sm font-semibold text-navy">
                {c.title}
              </Link>
            ))}
          </div>
        ) : (
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">
            Enquire about {item.code}
          </Link>
        )}
      </div>
    </PublicShell>
  )
}
