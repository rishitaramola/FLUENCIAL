import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { getPublishedTrainers } from '@/lib/data/trainers'
import { Globe, Award, Users, BookOpen, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Fluenciel Language Studio | Our Pedagogy & Faculty',
  description: 'Learn about Fluenciel Studio — a premier French language academy offering CEFR-aligned training, native faculty, and communicative fluency labs.',
}

export default async function AboutPage() {
  const trainers = await getPublishedTrainers()

  return (
    <PublicShell>
      {/* Header Banner */}
      <section className="bg-gray-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            About Fluenciel Studio
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Empowering Global Aspirations Through Language
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Fluenciel Language Studio was founded to bridge the gap between textbook grammar and real-world conversational fluency for students and professionals.
          </p>
        </div>
      </section>

      {/* The Fluenciel Method */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pedagogical Framework</span>
            <h2 className="text-3xl font-bold text-gray-900">The 5-Step Fluenciel Method</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
            {[
              { step: '01', title: 'Learn', desc: 'Core phonetics, grammar syntax, and vocabulary.' },
              { step: '02', title: 'Speak', desc: 'Live oral laboratories in small micro-cohorts.' },
              { step: '03', title: 'Apply', desc: 'Real-world dialogues & roleplay simulations.' },
              { step: '04', title: 'Practise', desc: 'Written corrections & audio dictation drills.' },
              { step: '05', title: 'Progress', desc: 'DELF/GOETHE mock diagnostic evaluations.' },
            ].map((m) => (
              <div key={m.step} className="rounded-xl border border-gray-200 bg-white/60 p-6 shadow-2xs space-y-2">
                <span className="text-2xl font-black text-indigo-600">{m.step}</span>
                <h3 className="font-bold text-gray-900 text-base">{m.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Showcase */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Our Instructors</span>
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Certified Faculty</h2>
            <p className="text-sm text-gray-600">Native French speakers and DELF-certified trainers dedicated to your linguistic success.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {trainers.map((t) => (
              <div key={t.id} className="rounded-2xl border border-gray-200 bg-white/60 p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xl shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600">{t.role}</p>
                    <p className="text-xs text-gray-500">{t.qualifications}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{t.bio}</p>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                  <span>Specialization: <strong>{t.specialization}</strong></span>
                  <span className="rounded bg-indigo-50 px-2 py-0.5 text-indigo-700 font-semibold">{t.languages}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
