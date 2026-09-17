import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { PublicShell } from '@/components/public-shell'
import { CourseCards } from '@/components/course-cards'
import { EnquiryForm } from '@/components/enquiry-form'
import { FAQSection } from '@/components/faq-section'
import { SuccessStoriesSection } from '@/components/success-stories-section'
import { getPublishedCourses } from '@/lib/data/courses'
import { getPublishedFaqs } from '@/lib/data/faqs'
import { getSuccessStories } from '@/lib/data/testimonials'
import { getSiteSettings } from '@/lib/data/site'
import { CEFR_LEVELS, normalizeLevel } from '@/lib/cefr'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'French language studio',
  description:
    'Fluenciel Language Studio offers structured French learning for students and professionals. Explore CEFR levels, courses, and book a free demo.',
}

export default async function HomePage() {
  const [courses, faqs, stories, settings] = await Promise.all([
    getPublishedCourses(),
    getPublishedFaqs(),
    getSuccessStories(),
    getSiteSettings(),
  ])
  const featured = courses.filter((c) => c.is_featured).slice(0, 3)
  const catalogue = (featured.length ? featured : courses).slice(0, 3)
  const activeLevels = new Set(courses.map((c) => normalizeLevel(c.level)).filter(Boolean))

  return (
    <PublicShell>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-medium text-navy/60 shadow-sm">
              Language without borders
            </p>
            <h1 className="mt-6 max-w-xl text-5xl font-semibold tracking-tight text-navy sm:text-6xl lg:text-[4.4rem] lg:leading-[1.05]">
              Find your <span className="fluency-gradient italic">fluency.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-navy/65 sm:text-lg">
              {settings.tagline ||
                'Thoughtful French courses for students, professionals, and endlessly curious minds. Learn to speak with confidence — and connect with a wider world.'}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white"
              >
                Book a Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy"
              >
                <Play className="h-3.5 w-3.5" /> Explore Courses
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy/55">
              <li>✓ Live small groups</li>
              <li>✓ Structured CEFR pathway</li>
              <li>✓ Practical conversation</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-[0_20px_60px_-28px_rgba(18,20,31,0.35)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/40">Fluency pathway</p>
                <h2 className="mt-2 text-xl font-semibold text-navy">French · Conversation</h2>
              </div>
              <span className="rounded-full bg-[#fce7f3] px-3 py-1 text-xs font-semibold text-pink-700">
                In progress
              </span>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef2ff] text-lg font-semibold text-indigo-500">
                é
              </span>
              <div>
                <p className="font-semibold text-navy">Speak with nuance</p>
                <p className="text-sm text-navy/50">Culture, cadence, and everyday confidence</p>
              </div>
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-navy/5">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400" />
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-wider text-navy/35">
              <span>Foundation</span>
              <span>Conversation</span>
              <span>Fluency</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ['1:1', 'attention'],
                ['Live', 'practice'],
                ['Global', 'context'],
              ].map(([title, sub]) => (
                <div key={title} className="rounded-2xl bg-[#f7f5fb] px-3 py-4 text-center">
                  <p className="text-sm font-semibold text-navy">{title}</p>
                  <p className="text-xs text-navy/45">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy/40">What Fluenciel offers</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          A language for every ambition
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy/60">
          French is our current focus. Courses are listed only when they are published. Other languages and higher
          levels may appear as Coming Soon.
        </p>
        <div className="mt-10">
          <CourseCards courses={catalogue} />
        </div>
        <div className="mt-6 text-right">
          <Link href="/courses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Meet Fluenciel →
          </Link>
        </div>
      </section>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid gap-8 border-y border-navy/8 py-16 md:grid-cols-2">
            <h2 className="text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
              Not memorised.
              <br />
              <span className="lived-gradient italic">Lived.</span>
            </h2>
            <div>
              <p className="text-base leading-relaxed text-navy/65">
                Fluenciel treats language as a living skill. Lessons combine sound, context, culture, and real conversation
                so progress feels natural and useful.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Speak', 'Listen', 'Understand', 'Belong'].map((item) => (
                  <span key={item} className="rounded-full border border-navy/10 bg-white px-4 py-1.5 text-sm text-navy/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy/40">Why learn French</p>
          <h2 className="mt-3 text-3xl font-semibold text-navy">A language for study, work, and the wider world</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Communication', 'Speak with more ease in class, travel, and everyday life.'],
              ['Education & exams', 'Prepare for CEFR-aligned study and official exams where offered.'],
              ['Career & mobility', 'Build French for work or France/Europe-related goals when those tracks are listed.'],
            ].map(([title, copy]) => (
              <article key={title} className="rounded-[1.8rem] bg-white/75 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy/40">French level pathway</p>
              <h2 className="mt-3 text-3xl font-semibold text-navy">A1 → C2</h2>
            </div>
            <Link href="/french" className="text-sm font-semibold text-indigo-600">
              Full pathway →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6">
            {CEFR_LEVELS.map((level) => {
              const active = activeLevels.has(level.code)
              return (
                <Link
                  key={level.code}
                  href={`/french/${level.code.toLowerCase()}`}
                  className="rounded-3xl border border-white bg-white/80 p-4 text-center shadow-sm"
                >
                  <p className="text-lg font-semibold text-navy">{level.code}</p>
                  <p className="text-xs text-navy/45">{level.name}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-navy/40">
                    {active ? 'Offered' : 'Coming Soon'}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold text-navy">Exam preparation</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy/60">
            DELF and TCF are official exams run by recognised testing bodies. Fluenciel may offer exam-oriented practice
            when a published course lists it. Completing a studio course is not an official diploma, and results are not
            guaranteed.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-4 py-2 text-sm text-navy/70">DELF preparation — where listed</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm text-navy/70">TCF preparation — where listed</span>
            <span className="rounded-full bg-navy/5 px-4 py-2 text-sm text-navy/45">France guidance — Coming Soon</span>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 className="text-3xl font-semibold text-navy">Success stories</h2>
          <p className="mt-2 text-sm text-navy/60">Only real, published student stories are shown.</p>
          <div className="mt-8">
            <SuccessStoriesSection stories={stories} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-semibold text-navy">Questions, answered calmly</h2>
          <div className="mt-10">
            <FAQSection faqs={faqs} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="lead-form" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="rounded-[2.2rem] bg-navy px-6 py-12 text-white sm:px-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold">Book a free demo</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  Tell us where you are with French and what you want to reach. We will reply with current course and
                  demo options — no fabricated urgency, no invented promises.
                </p>
              </div>
              <div className="rounded-[1.8rem] bg-white p-6 text-navy">
                <EnquiryForm courses={courses} />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </PublicShell>
  )
}
