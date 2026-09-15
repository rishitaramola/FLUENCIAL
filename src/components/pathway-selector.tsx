'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Award, Briefcase, MessageSquare, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

export interface Pathway {
  id: string
  title: string
  subtitle: string
  iconName: 'academic' | 'exam' | 'career' | 'communication' | 'intensive'
  description: string
  recommendedLevel: string
  outcomes: string[]
}

const PATHWAYS: Pathway[] = [
  {
    id: 'academic',
    title: 'Study in France',
    subtitle: 'Higher Education & Campus France',
    iconName: 'academic',
    description: 'Targeted preparation for students seeking admission to French universities, Grandes Écoles, and clearing Campus France visa interviews.',
    recommendedLevel: 'French B1 – B2',
    outcomes: ['Campus France Interview Prep', 'Academic Essay Writing', 'University Admission Guidance'],
  },
  {
    id: 'exam',
    title: 'DELF / DALF / TEF Exam Prep',
    subtitle: 'Official CEFR Certifications',
    iconName: 'exam',
    description: 'Rigorous exam preparation featuring authentic mock test suites, oral examiner diagnostics, and Canada PR / TEF scoring strategies.',
    recommendedLevel: 'French A1 – C1',
    outcomes: ['5+ Full Mock Exam Suites', '1-on-1 Speaking Feedback', 'DELF/TEF Score Guarantee'],
  },
  {
    id: 'career',
    title: 'Professional & Business French',
    subtitle: 'Workplace & Career Advancement',
    iconName: 'career',
    description: 'Designed for working professionals needing business vocabulary, corporate email syntax, and MNC job interview readiness.',
    recommendedLevel: 'French B1 – B2',
    outcomes: ['Corporate Communication Syntax', 'French Resume & LinkedIn', 'Job Interview Simulations'],
  },
  {
    id: 'communication',
    title: 'Everyday Speaking & Fluency',
    subtitle: 'Conversational Confidence',
    iconName: 'communication',
    description: 'Immersive oral practice labs focused on overcoming hesitation, refining accent phonetics, and holding natural conversations.',
    recommendedLevel: 'French A1 – B1',
    outcomes: ['60+ Live Speaking Lab Hours', 'Native Accent Phonetics', 'Small Cohort Practice'],
  },
]

export function PathwaySelector() {
  const [selectedId, setSelectedId] = useState<string>('academic')
  const activePathway = PATHWAYS.find((p) => p.id === selectedId) || PATHWAYS[0]

  return (
    <div className="space-y-8">
      {/* Tabs / Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PATHWAYS.map((p) => {
          const isSelected = p.id === selectedId
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`flex flex-col items-start p-4 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-600'
                  : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50/50'
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`}>
                {p.subtitle}
              </span>
              <span className={`text-base font-bold mt-1 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                {p.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Pathway Details Card */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100/60 pb-4">
          <div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
              Recommended: {activePathway.recommendedLevel}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">{activePathway.title} Pathway</h3>
          </div>
          <Link
            href={`/courses`}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors w-fit"
          >
            Explore Matching Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
          {activePathway.description}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
          {activePathway.outcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 bg-white p-3 rounded-lg border border-gray-100 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
