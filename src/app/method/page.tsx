import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { 
  ArrowRight,
  Compass,
  MessageCircle,
  Target,
  Award,
  TrendingUp,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Method | Fluenciel Language Studio',
  description: 'Language learning with structure, practice, and purpose.',
}

export default function MethodPage() {
  const steps = [
    {
      id: '01',
      title: 'Learn with a clear pathway',
      desc: 'We focus on structured progression. Whether you are starting from zero or preparing for an exam, every course follows a logical, step-by-step framework to ensure you build a strong foundation without feeling overwhelmed.',
      icon: Compass,
    },
    {
      id: '02',
      title: 'Build real communication skills',
      desc: 'Language is meant to be spoken. Our interactive classes prioritize practical French communication, giving you the speaking confidence needed to handle real-world scenarios and cultural context.',
      icon: MessageCircle,
    },
    {
      id: '03',
      title: 'Practice with purpose',
      desc: 'Consistent practice is key to fluency. We provide targeted assignments, personalized learning feedback, and ongoing doubt-solving sessions so that what you learn actually stays with you.',
      icon: Target,
    },
    {
      id: '04',
      title: 'Prepare for the right goal',
      desc: 'We integrate exam-oriented preparation into our specialized tracks. From TEF/TCF to DELF/DALF, our expert guidance ensures you are practicing the right formats, timing, and skills for your specific objective.',
      icon: Award,
    },
    {
      id: '05',
      title: 'Track progress and improve consistently',
      desc: 'Through regular assessments, mock sessions, and constructive feedback, you will always know where you stand and exactly what you need to do to improve before test day.',
      icon: TrendingUp,
    },
  ]

  return (
    <PublicShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-sm font-bold tracking-widest text-navy/40 uppercase mb-4">
              Method
            </h1>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-navy tracking-tight mb-6">
              Language learning with structure, practice, and <span className="lived-gradient italic">purpose.</span>
            </h2>
            <p className="text-lg sm:text-xl text-navy/60 leading-relaxed mb-10">
              Fluenciel focuses on structured progression, practical French communication, and expert guidance. 
              We treat language as a living skill, blending real-world context with personalized learning.
            </p>
            
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white transition hover:bg-navy/90 shadow-sm"
            >
              Explore our pathways <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div 
                  key={step.id} 
                  className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md transition hover:bg-white/60 flex flex-col"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-indigo-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-bold text-navy/5 font-heading">
                      {step.id}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-navy mb-4">
                    {step.title}
                  </h3>
                  <p className="text-navy/65 leading-relaxed text-sm flex-1">
                    {step.desc}
                  </p>
                </div>
              )
            })}
            
            {/* CTA Card */}
            <div className="rounded-[2.5rem] border border-indigo-100 bg-indigo-50/50 p-8 shadow-sm backdrop-blur-md flex flex-col justify-center text-center">
              <h3 className="font-heading text-2xl font-bold text-navy mb-4">
                Ready to start?
              </h3>
              <p className="text-navy/65 leading-relaxed text-sm mb-8">
                Choose the pathway that matches your goals and experience our method firsthand.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 mx-auto"
              >
                Find your course
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
