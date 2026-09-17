import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { getPublishedTrainers } from '@/lib/data/trainers'

export const metadata: Metadata = {
  title: 'About Fluenciel | Our Pedagogy & Faculty',
  description: 'Learn about Fluenciel Language Studio — a premier French academy offering CEFR-aligned training, native faculty, and communicative fluency labs.',
}

export default async function AboutPage() {
  const trainers = await getPublishedTrainers()

  return (
    <PublicShell>
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/60 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-navy/70">
              About Fluenciel Studio
            </span>
          </div>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl mx-auto max-w-4xl">
            Empowering Global Aspirations Through Language
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl mx-auto max-w-2xl">
            Fluenciel Language Studio was founded to bridge the gap between textbook grammar and real-world conversational fluency for students and professionals.
          </p>
        </div>
      </section>

      {/* The Fluenciel Method */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">The 5-Step Fluenciel Method</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: '01', title: 'Learn', desc: 'Core phonetics, grammar syntax, and vocabulary.' },
              { step: '02', title: 'Speak', desc: 'Live oral laboratories in small micro-cohorts.' },
              { step: '03', title: 'Apply', desc: 'Real-world dialogues & roleplay simulations.' },
              { step: '04', title: 'Practise', desc: 'Written corrections & audio dictation drills.' },
              { step: '05', title: 'Progress', desc: 'DELF mock diagnostic evaluations.' },
            ].map((m) => (
              <div key={m.step} className="rounded-[2rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md transition-transform hover:-translate-y-1">
                <span className="text-3xl font-black text-studio/30">{m.step}</span>
                <h3 className="font-heading mt-4 text-xl font-bold text-navy">{m.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-navy/60">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Showcase */}
      {trainers.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">Meet Our Certified Faculty</h2>
              <p className="mt-4 text-[15px] text-navy/60">Native speakers and DELF-certified trainers dedicated to your linguistic success.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {trainers.map((t) => (
                <div key={t.id} className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md flex flex-col sm:p-10">
                  <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-studio/10 text-studio font-heading font-bold text-2xl shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-navy">{t.name}</h3>
                      <p className="text-[13px] font-semibold tracking-wider uppercase text-studio mt-1">{t.role}</p>
                      <p className="text-[13px] text-navy/50 mt-0.5">{t.qualifications}</p>
                    </div>
                  </div>

                  <p className="mt-6 flex-1 text-[14px] text-navy/65 leading-relaxed">{t.bio}</p>

                  <div className="mt-8 pt-6 border-t border-navy/5 flex flex-wrap items-center justify-between gap-4 text-[13px]">
                    <span className="text-navy/50">Specialization: <strong className="text-navy">{t.specialization}</strong></span>
                    <span className="rounded-full bg-studio/10 px-3 py-1 text-studio font-bold tracking-wider uppercase text-[11px]">{t.languages}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicShell>
  )
}
